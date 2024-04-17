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

@ApiTags('Tools')
@Controller('tools')
@ApiBearerAuth()
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Get('list')
  @ApiOkResponse({ type: Array<ToolDto> })
  getList() {
    return this.toolService.getList();
  }

  @Post('submit-tool')
  @ApiOkResponse({ type: ToolDto })
  @ApiFile([
    { name: 'logo', maxCount: 1 },
    { name: 'screenshots', maxCount: 5 },
  ])
  @UsePipes(new SingularPropertyPipeTransform())
  //   @UseGuards(AuthenticationGuard, RolesGuard)
  //   @Permission({
  //     action: PermissionActions.CREATE_TOOL,
  //     description: PermissionActions.CREATE_TOOL,
  //   })
  create(
    @Body() dto: UpsertToolDto,
    @UploadedFiles() media: UploadMediaToolDto,
  ) {
    return this.toolService.create(dto, media);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.DELETE_SUBSCRIPTION_DETAIL,
    description: PermissionActions.DELETE_SUBSCRIPTION_DETAIL,
  })
  delete(@Param(':id') id: string, @Req() req: Request) {
    return this.toolService.delete(id, <IJwtPayload>req.user);
  }
}
