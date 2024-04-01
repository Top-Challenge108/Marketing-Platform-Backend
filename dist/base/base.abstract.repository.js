"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAbstractRepository = void 0;
const mongoose_1 = require("mongoose");
const helpers_1 = require("../common/helpers");
class BaseAbstractRepository {
    constructor(model) {
        this.model = model;
    }
    findOneAndDelete(filter, options) {
        return this.model.findOneAndDelete(filter, options);
    }
    create(data) {
        return this.model.create(data);
    }
    insertMany(docs, options) {
        return this.model.insertMany(docs, options);
    }
    updateOne(filter, data, options) {
        return this.model.findOneAndUpdate(filter, data, options);
    }
    updateMany(filter, data, options) {
        return this.model.updateMany(filter, data, options);
    }
    findOne(filter) {
        return this.model.findOne(filter);
    }
    findAll(filter, projection) {
        return this.model.find(filter, projection);
    }
    deleteOne(filter, projection) {
        return this.model.deleteOne(filter, projection);
    }
    deleteMany(filter, options) {
        return this.model.deleteMany(filter, options);
    }
    findByIdAndDelete(id, options) {
        return this.model.findByIdAndDelete(id, options);
    }
    findByIdAndUpdate(id, update, options) {
        return this.model.findByIdAndUpdate(id, update, options);
    }
    findOneAndUpdate(filter, update, options) {
        return this.model.findOneAndUpdate(filter, update, options);
    }
    findById(id, filter, options) {
        return this.model.findById(id, filter, options);
    }
    aggregate(pipeline, options) {
        return this.model.aggregate(pipeline, options);
    }
    populate(docs, options) {
        return this.model.populate(docs, options);
    }
    async paginate(filter, options) {
        const { limit, skip, page } = (0, helpers_1.generatePaginateOption)(options);
        const totalDocs = await this.model.countDocuments(filter);
        return this.model
            .find(filter, null, options)
            .skip(skip)
            .limit(limit)
            .exec()
            .then((data) => {
            return (0, helpers_1.paginationTransformer)({
                data,
                totalDocs,
                page,
                limit,
            });
        });
    }
    async aggregatePaginate(filter, options) {
        const { limit, skip, page } = (0, helpers_1.generatePaginateOption)(options);
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
            .then((data = []) => {
            var _a, _b;
            return (0, helpers_1.paginationTransformer)({
                data,
                totalDocs: ((_b = (_a = totalDocs[0]) === null || _a === void 0 ? void 0 : _a.totalCount[0]) === null || _b === void 0 ? void 0 : _b.totalDocuments) || 0,
                page,
                limit,
            });
        })
            .catch(() => (0, helpers_1.paginationTransformer)({}));
    }
    async queryList(queryCommonDto, options, query = {}, listQuery = ['_id']) {
        const { sortBy, keywords, limit, page } = queryCommonDto;
        const mapOptions = Object.assign({ limit,
            page, sort: {} }, options);
        if (keywords) {
            query = Object.assign(Object.assign({}, query), this.filterQuery(listQuery, keywords));
        }
        if (sortBy) {
            const mapSortBy = sortBy.split('_');
            mapOptions.sort = Object.assign(Object.assign({}, this.mergeSort(mapSortBy)), options.sort);
        }
        return this.paginate(query, mapOptions);
    }
    async queryListAggregate(queryCommonDto, options, query, listQuery = ['_id'], match = {}) {
        var _a;
        const { limit, page, sortBy, keywords } = queryCommonDto;
        const listSelect = (_a = options === null || options === void 0 ? void 0 : options.select) === null || _a === void 0 ? void 0 : _a.split(' ');
        let mapOptions = {
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
            match = Object.assign(Object.assign({}, match), this.filterQuery(listQuery, keywords));
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
            mapOptions.sort = Object.assign(Object.assign({}, this.mergeSort(mapSortBy)), options.sort);
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
    filterAggregateSelect(listSelect) {
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
    filterQuery(listQuery, keywords) {
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
    isIdOject(keywords) {
        if (mongoose_1.Types.ObjectId.isValid(keywords)) {
            return true;
        }
        return false;
    }
    mergeSort(mapSortBy) {
        if (mapSortBy.length == 2 &&
            (mapSortBy[1] == 'desc' || mapSortBy[1] == 'asc') &&
            mapSortBy[0] !== 'fullName') {
            return {
                [mapSortBy[0]]: mapSortBy[1],
            };
        }
        return {};
    }
    regexKeyword(keywords) {
        return new RegExp(keywords.trim().replace(/[-\/\\^$#!%*+?.()|[\]{}]/g, '\\$&'));
    }
}
exports.BaseAbstractRepository = BaseAbstractRepository;
//# sourceMappingURL=base.abstract.repository.js.map