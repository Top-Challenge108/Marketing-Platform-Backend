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
} from '@nestjs/common';
import { PermissionActions } from '../../common/common.constants';
import { Permission } from '../../common/permissions.decorator';
import { SubscriptionService } from './subscription.service';
import { UpsertSubscriptionDto } from './dto/upsert-subscription.dto';
import { SubscriptionDto } from './dto/subscription.dto';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { IJwtPayload } from '../auth/payloads/jwt-payload.payload';
import { Request } from 'express';

@ApiTags('Subscriptions')
@Controller('subscriptions')
@ApiBearerAuth()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get('list')
  @ApiOkResponse({ type: Array<SubscriptionDto> })
  getList() {
    return this.subscriptionService.getList();
  }

  @Post()
  @ApiOkResponse({ type: SubscriptionDto })
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.CREATE_NEW_SUBSCRIPTION,
    description: PermissionActions.CREATE_NEW_SUBSCRIPTION,
  })
  create(@Body() dto: UpsertSubscriptionDto) {
    return this.subscriptionService.create(dto);
  }

  @Delete(':id')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.DELETE_SUBSCRIPTION_DETAIL,
    description: PermissionActions.DELETE_SUBSCRIPTION_DETAIL,
  })
  delete(@Param(':id') id: string, @Req() req: Request) {
    return this.subscriptionService.delete(id, <IJwtPayload>req.user);
  }
}
