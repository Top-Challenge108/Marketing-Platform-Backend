import { CommonPaginationDto } from '../../../common/pagination.dto';
export declare class GetRolesDto extends CommonPaginationDto {
    keywords?: string;
    active?: string;
    sortBy?: string;
}
