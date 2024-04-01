import { LanguageCode } from './common.constants';
import { CommonPaginationDto } from './pagination.dto';
export declare class ResponseDto {
    success: boolean;
    message: string;
    statusCode: number;
}
export declare class HeaderDto {
    lang?: LanguageCode;
}
export declare class PermissionDto {
    action: string;
    description?: string;
}
export declare class QueryCommonDto extends CommonPaginationDto {
    sortBy: string;
}
