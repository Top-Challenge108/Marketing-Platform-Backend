/* istanbul ignore file */
import { BaseInterfaceRepository } from './base.interface.repository';
import { Types, Model } from 'mongoose';
import {
  generatePaginateOption,
  paginationTransformer,
} from '../common/helpers';
import { CommonPaginationDto } from '../common/pagination.dto';
import { QueryCommonDto } from '../common/common.dto';
export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  private model: Model<T>;
  protected constructor(model: Model<T>) {
    this.model = model;
  }
  findOneAndDelete(filter: any, options?: any) {
    return this.model.findOneAndDelete(filter, options);
  }

  public create(data: T | any) {
    return this.model.create(data);
  }

  public insertMany(docs: Array<T> | any, options?: T | any | null) {
    return this.model.insertMany(docs, options);
  }

  public updateOne(filter: T | any, data: T | any, options?: T | any | null) {
    return this.model.findOneAndUpdate(filter, data, options);
  }

  public updateMany(filter: T | any, data: T | any, options?: T | any | null) {
    return this.model.updateMany(filter, data, options);
  }

  public findOne(filter: T | any) {
    return this.model.findOne(filter);
  }

  public findAll(filter?: T | any | null, projection?: T | null) {
    return this.model.find(filter, projection);
  }

  public deleteOne(filter: T | any, projection?: T | null) {
    return this.model.deleteOne(filter, projection);
  }

  public deleteMany(filter: T | any, options?: T | any) {
    return this.model.deleteMany(filter, options);
  }

  public findByIdAndDelete(id: string, options?: T | any) {
    return this.model.findByIdAndDelete(id, options);
  }

  public findByIdAndUpdate(id: string, update: T | any, options?: T | any) {
    return this.model.findByIdAndUpdate(id, update, options);
  }

  public findOneAndUpdate(filter: T | any, update: T | any, options?: T | any) {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  public findById(id: string, filter?: T | any, options?: T | any) {
    return this.model.findById(id, filter, options);
  }

  public aggregate(pipeline: T | any, options?: T | any) {
    return this.model.aggregate(pipeline, options);
  }

  public populate(docs: Array<T>, options?: T | any) {
    return this.model.populate(docs, options);
  }

  public async paginate(
    filter: T | any,
    options: T | any,
  ): Promise<CommonPaginationDto> {
    const { limit, skip, page } = generatePaginateOption(options);
    const totalDocs = await this.model.countDocuments(filter);
    return this.model
      .find(filter, null, options)
      .skip(skip)
      .limit(limit)
      .exec()
      .then((data: any) => {
        return paginationTransformer({
          data,
          totalDocs,
          page,
          limit,
        });
      });
  }

  public async aggregatePaginate(
    filter: T | any,
    options: T | any,
  ): Promise<CommonPaginationDto> {
    const { limit, skip, page } = generatePaginateOption(options);
    const totalDocs = await this.model.aggregate([
      ...filter,
      {
        $facet: {
          totalCount: [{ $count: 'totalDocuments' }],
        },
      },
    ]);
    return this.model
      .aggregate(filter)
      .skip(skip)
      .limit(limit)
      .exec()
      .then((data: any = []) =>
        paginationTransformer({
          data,
          totalDocs: totalDocs[0]?.totalCount[0]?.totalDocuments || 0,
          page,
          limit,
        }),
      )
      .catch(() => paginationTransformer({}));
  }

  public async queryList(
    queryCommonDto: QueryCommonDto | any,
    options: any,
    query = {},
    listQuery: string[] = ['_id'],
  ): Promise<any> {
    const { sortBy, keywords, limit, page } = queryCommonDto;
    const mapOptions = {
      limit,
      page,
      sort: {},
      ...options,
    };
    if (keywords) {
      query = { ...query, ...this.filterQuery(listQuery, keywords) };
    }
    if (sortBy) {
      const mapSortBy = sortBy.split('_');
      mapOptions.sort = { ...this.mergeSort(mapSortBy), ...options.sort };
    }
    return this.paginate(query, mapOptions);
  }

  public async queryListAggregate(
    queryCommonDto: QueryCommonDto | any,
    options: any,
    query: object[],
    listQuery: string[] = ['_id'],
    match = {},
  ) {
    const { limit, page, sortBy, keywords } = queryCommonDto;
    const listSelect = options?.select?.split(' ');
    let mapOptions: any = {
      limit,
      page,
      sort: {},
    };
    if (page <= 0 || limit <= 0) {
      mapOptions = {
        pagination: false,
        sort: {},
      };
    }
    if (keywords) {
      match = { ...match, ...this.filterQuery(listQuery, keywords) };
    }
    if (Object.keys(match).length) {
      query = [
        ...query,
        {
          $match: match,
        },
      ];
    }

    if (listSelect && listSelect.length) {
      query = [...query, this.filterAggregateSelect(listSelect)];
    }
    if (sortBy) {
      const mapSortBy = sortBy.split('_');
      mapOptions.sort = { ...this.mergeSort(mapSortBy), ...options.sort };
      const sortObject = {};
      for (const key in mapOptions.sort) {
        sortObject[key] = mapOptions.sort[key] == 'asc' ? 1 : -1;
      }
      query = [
        {
          $sort: sortObject,
        },
        ...query,
      ];
    }
    return this.aggregatePaginate(query, mapOptions);
  }

  private filterAggregateSelect(listSelect: string[]) {
    const project = {};
    for (const s of listSelect) {
      project[s] = 1;
      if (s == 'fullName') {
        project[s] = { $concat: ['$firstName', ' ', '$lastName'] };
      }
    }
    return {
      $project: project,
    };
  }

  private filterQuery(listQuery: string[], keywords: any) {
    const tempOr = [];
    const query = {};
    for (const q of listQuery) {
      if (q === '_id') {
        if (this.isIdOject(keywords)) {
          query['_id'] = keywords;
          break;
        }
        continue;
      }
      if (q === 'fullName') {
        tempOr.push({
          $expr: {
            $regexMatch: {
              input: { $concat: ['$firstName', ' ', '$lastName'] },
              regex: this.regexKeyword(keywords),
              options: 'i',
            },
          },
        });
        continue;
      }
      tempOr.push({ [q]: new RegExp(this.regexKeyword(keywords), 'i') });
      if (tempOr.length) {
        query['$or'] = tempOr;
      }
    }
    return query;
  }

  private isIdOject(keywords: string) {
    if (Types.ObjectId.isValid(keywords)) {
      return true;
    }
    return false;
  }

  private mergeSort(mapSortBy: any) {
    if (
      mapSortBy.length == 2 &&
      (mapSortBy[1] == 'desc' || mapSortBy[1] == 'asc') &&
      mapSortBy[0] !== 'fullName' // detect case sort user fullName
    ) {
      return {
        [mapSortBy[0]]: mapSortBy[1],
      };
    }
    return {};
  }

  private regexKeyword(keywords) {
    return new RegExp(
      keywords.trim().replace(/[-\/\\^$#!%*+?.()|[\]{}]/g, '\\$&'),
    );
  }
}
