export interface IPaginationData<T = any> {
    data: T;
    page: number;
    limit: number;
    total: number;
}
export interface IOptionLang {
    key: string;
    lang: string;
    args?: string | any;
}
export interface IResultDataCommon {
    data: object | object[] | null;
    statusCode: number;
}
