import { ResponseDto } from '../../../common/common.dto';
export declare class SignUpDto {
    email: string;
    phone: string;
    password: string;
    firstName: string;
    lastName: string;
    role: string;
    company: string;
    placeId: string;
}
export declare class ResponseSignUpDto extends ResponseDto {
}
