import { CommonPaginationDto } from '../common/pagination.dto';
export interface BaseInterfaceRepository<T> {
    create(data: T | any): T | any;
    insertMany(docs: Array<T> | any, options?: T | any | null): T | any;
    updateOne(filter: T | any, data: T | any): T | any;
    updateMany(filter: T | any, data: T | any): T | any;
    findOne(filter: T | any): T | any;
    findAll(filter: T | any): T | any;
    deleteOne(filter: T | any): T | any;
    deleteMany(filter: T | any, options?: T | any): T | any;
    findByIdAndDelete(id: string, options?: T | any): T | any;
    findByIdAndUpdate(id: string, update: T | any, options?: T | any): T | any;
    findOneAndDelete(filter: T | any, options?: T | any): T | any;
    findOneAndUpdate(filter: T | any, update: T | any, options?: T | any): T | any;
    findById(id: string, filter?: T | any, options?: T | any): T | any;
    paginate(filter: T | any, options?: T | any): Promise<CommonPaginationDto>;
    aggregatePaginate(aggregate: T | any, options?: T | any): Promise<CommonPaginationDto>;
}
