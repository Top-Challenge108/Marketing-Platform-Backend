import { ResponseDto } from '../../../common/common.dto';
import { UserResponseDto } from '../dto/user-response.dto';
export declare class UserListDto extends ResponseDto {
    result: {
        data: UserResponseDto[];
        total: number;
        page: number;
        limit: number;
        message: string;
    };
}
