import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { PermissionActions } from '../../common/common.constants';
import { Permission } from '../../common/permissions.decorator';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { LocationService } from './location.service';
import { LocationDto } from './dto/location.dto';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Locations')
@Controller('locations')
@UseGuards(AuthenticationGuard, RolesGuard)
@ApiBearerAuth()
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/list')
  @ApiOkResponse({
    type: LocationDto,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Permission({
    action: PermissionActions.VIEW_USER_LIST,
    description: PermissionActions.VIEW_USER_LIST,
  })
  getLocations() {
    return this.locationService.getLocations();
  }
}
