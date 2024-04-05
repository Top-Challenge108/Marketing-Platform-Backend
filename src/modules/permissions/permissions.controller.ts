import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  // Query,
  // UseGuards,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionsDto } from './dto/create-permissions.dto';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { ResponsePermissionsDto } from './dto/response-permissions.dto';
import { GetPermissionsDto } from './dto/get-permissions.dto';
// import { GetPermissionsDto } from './dto/get-permissions.dto';
// import { AuthenticationGuard } from '../auth/guards/auth.guard';
// import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Permissions')
// @UseGuards(AuthenticationGuard, RolesGuard)
// @ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  //   @Post()
  //   @ApiOkResponse({ type: ResponsePermissionsDto })
  //   create(@Body() createPermissionsDto: CreatePermissionsDto) {
  //     return this.permissionsService.create(createPermissionsDto);
  //   }

  //   @Get('/list')
  //   @HttpCode(HttpStatus.OK)
  //   @ApiOkResponse({ type: [ResponsePermissionsDto] })
  //   getPermissions(@Query() getRolesDto: GetPermissionsDto) {
  //     return this.permissionsService.getPermissions(getRolesDto);
  //   }

  //   @Get(':id')
  //   @ApiOkResponse({ type: ResponsePermissionsDto })
  //   findOne(@Param('id') id: string) {
  //     return this.permissionsService.findOne(id);
  //   }

  //   @Patch(':id')
  //   @ApiOkResponse({ type: ResponsePermissionsDto })
  //   update(
  //     @Param('id') id: string,
  //     @Body() updatePermissionsDto: UpdatePermissionsDto,
  //   ) {
  //     return this.permissionsService.update(id, updatePermissionsDto);
  //   }

  //   @Delete(':id')
  //   @ApiOkResponse()
  //   remove(@Param('id') id: string) {
  //     return this.permissionsService.remove(id);
  //   }
}
