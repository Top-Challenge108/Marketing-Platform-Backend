export declare class CommonPaginationDto {
    page: number;
    limit: number;
    data?: any;
    total?: number;
}
export declare class PaginationResDto {
    total: number;
    page: number;
    limit: number;
}
export declare class SearchSortDto extends CommonPaginationDto {
    keywords: string;
}
