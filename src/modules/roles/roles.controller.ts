import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { ResponseRolesDto } from './dto/response-roles.dto';
import { IdsDto } from './dto/ids.dto';
import { GetRolesDto } from './dto/get-roles.dto';
import { AddUserRoleDto } from './dto/add-user-role.dto';
import { PermissionActions } from '../../common/common.constants';
import { Permission } from '../../common/permissions.decorator';
import { IDRoleDto } from './dto/id-role-dto';
// import { AuthenticationGuard } from '../auth/guards/auth.guard';
// import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Roles')
@Controller('roles')
// @UseGuards(AuthenticationGuard, RolesGuard)
// @ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @ApiOkResponse({ type: ResponseRolesDto })
  @Permission({
    action: PermissionActions.CREATE_NEW_ROLE,
    description: PermissionActions.CREATE_NEW_ROLE,
  })
  create(@Body() createRolesDto: CreateRolesDto) {
    return this.rolesService.create(createRolesDto);
  }

  @Get('/get-permissions')
  @ApiOkResponse({ type: IdsDto })
  getAllPermissions(@Query() idsDto: IdsDto) {
    return this.rolesService.getAllPermissions(idsDto);
  }

  @Get('/list')
  @ApiOkResponse({
    type: ResponseRolesDto,
  })
  @HttpCode(HttpStatus.OK)
  @Permission({
    action: PermissionActions.VIEW_ROLE_LIST,
    description: PermissionActions.VIEW_ROLE_LIST,
  })
  getRoles(@Query() getRolesDto: GetRolesDto) {
    return this.rolesService.getRoles(getRolesDto);
  }

  @Get(':id')
  @Permission({
    action: PermissionActions.VIEW_ROLE_DETAIL,
    description: PermissionActions.VIEW_ROLE_DETAIL,
  })
  @ApiOkResponse({ type: ResponseRolesDto })
  findOne(@Param() iDRoleDto: IDRoleDto) {
    return this.rolesService.findOne(iDRoleDto);
  }

  @Patch(':id')
  @Permission({
    action: PermissionActions.EDIT_ROLE,
    description: PermissionActions.EDIT_ROLE,
  })
  @ApiOkResponse({ type: ResponseRolesDto })
  update(@Param('id') id: string, @Body() updateRolesDto: UpdateRolesDto) {
    return this.rolesService.update(id, updateRolesDto);
  }
  @Delete('/delete-user')
  @ApiOkResponse({ type: ResponseRolesDto })
  deleteUser(@Body() addUserRoleDto: AddUserRoleDto) {
    return this.rolesService.removeUserRoles(addUserRoleDto);
  }
  @Delete(':id')
  @ApiOkResponse()
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
  @Post('/add-user')
  @ApiOkResponse({ type: ResponseRolesDto })
  @Permission({
    action: PermissionActions.EDIT_ROLE,
    description: PermissionActions.EDIT_ROLE,
  })
  addUser(@Body() addUserRoleDto: AddUserRoleDto) {
    return this.rolesService.createUserRole(addUserRoleDto);
  }
}
