import { CommonPaginationDto } from '../../../common/pagination.dto';
import { Role } from '../../../common/common.constants';
export declare class GetUserDto extends CommonPaginationDto {
    keywords?: string;
    status?: string;
    placeId?: string;
    sortBy?: string;
    role?: Role[];
}
export declare class exportUserCsvDto {
    page: number;
    limit: number;
    keywords?: string;
    status?: string;
    sortBy?: string;
}
