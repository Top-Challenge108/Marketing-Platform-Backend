import { IRoles } from '../roles.interface';
export declare class ResponseRolesDto implements IRoles {
    name: string;
    description: string;
    active?: string;
    permissions: string[];
}
