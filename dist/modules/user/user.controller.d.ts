import { IDDto } from './dto/id.dto';
import { UserService } from './user.service';
import { GetUserDto } from './dto/get-users.dto';
import { EditUserInfoDto } from './dto/edit-user-info.dto';
import { ResponseGetInfoDto } from './dto/reponse-get-info.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { ResponseDto } from '../../common/common.dto';
import { PutObjectDto } from './dto/put-object.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(getUserDto: GetUserDto): Promise<any>;
    findUser(req: any): Promise<{
        success: boolean;
        message: string;
        result: object;
        statusCode: number;
    }>;
    getUploadSignedUrl(input: PutObjectDto, req: any): Promise<object>;
    editUserInformation(req: any, editUserInfoDto: EditUserInfoDto): Promise<ResponseDto>;
    changeUserStatus({ user }: {
        user: any;
    }, changeStatusDto: ChangeStatusDto, idDto: IDDto): Promise<ResponseDto>;
    getUserDetails(req: any, idDto: IDDto): Promise<ResponseGetInfoDto>;
}
