import { IPaginationData } from './commom.interface';
export declare const mongooseAggregatePaginate: any;
export declare const paginate: any;
export declare function paginationTransformer(input: any): IPaginationData;
export declare const decodePassword: (password: any) => string;
export declare const getRndInteger: (min: any, max: any) => any;
export declare const getSasUrl: (fileName: string, permissions: string, id: string) => Promise<string>;
export declare const validateSasPermission: (permissions: any) => boolean;
export declare const generatePaginateOption: ({ page, limit, }: {
    page: any;
    limit: any;
}) => any;
export declare const getPlaceDetails: (placeId: any) => Promise<{
    location: any[];
    address: any;
    name: any;
    placeId: any;
}>;
