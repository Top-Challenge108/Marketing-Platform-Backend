import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Delete,
  Param,
  Req,
  UsePipes,
  UploadedFiles,
  Query,
} from '@nestjs/common';
import { PermissionActions } from '../../common/common.constants';
import { Permission } from '../../common/permissions.decorator';
import { ToolService } from './tool.service';
import { UploadMediaToolDto, UpsertToolDto } from './dto/upsert-tool.dto';
import { ToolDto } from './dto/tool.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';
import { Request } from 'express';
import { ApiFile } from '../../common/swagger.decorator';
import { SingularPropertyPipeTransform } from '../../transformers/singular-property.transform';
import { PageOptionsDto } from '../../common/page-options.dto';
import { FilterToolPageOptionsDto } from './dto/filter-tool.dto';

@ApiTags('Tools')
@Controller('tools')
@ApiBearerAuth()
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get('filter')
  filterList(@Query() filter: FilterToolPageOptionsDto) {
    return this.toolService.filterTool(filter);
  }

  @Get('list')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.VIEW_TOOL,
    description: PermissionActions.VIEW_TOOL,
  })
  getList(@Query() filter: PageOptionsDto, @Req() req: Request) {
    return this.toolService.getList(filter, <IJwtPayload>req.user);
  }

  @Post('submit-tool')
  @ApiOkResponse({ type: ToolDto })
  @ApiFile([
    { name: 'logo', maxCount: 1 },
    { name: 'screenshots', maxCount: 5 },
  ])
  @UsePipes(new SingularPropertyPipeTransform())
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.CREATE_TOOL,
    description: PermissionActions.CREATE_TOOL,
  })
  create(
    @Body() dto: UpsertToolDto,
    @UploadedFiles() media: UploadMediaToolDto,
    @Req() req: Request,
  ) {
    return this.toolService.create(dto, media, <IJwtPayload>req.user);
  }

  @Post('publish-tool/:id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.PUBLISH_TOOL,
    description: PermissionActions.PUBLISH_TOOL,
  })
  publish(@Param(':id') id: string, @Req() req: Request) {
    return this.toolService.publish(id, <IJwtPayload>req.user);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.DELETE_TOOL,
    description: PermissionActions.DELETE_TOOL,
  })
  delete(@Param(':id') id: string, @Req() req: Request) {
    return this.toolService.delete(id, <IJwtPayload>req.user);
  }
}
