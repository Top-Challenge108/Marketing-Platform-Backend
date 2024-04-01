import { PartialType } from '@nestjs/mapped-types';
import { CreateRolesDto } from './create-roles.dto';

export class UpdateRolesDto extends PartialType(CreateRolesDto) {}
