import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthenticationGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { PutObjectDto } from './dto/put-object.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   @Get('/list')
  //   @ApiOkResponse({
  //     type: UserListDto,
  //   })
  //   @HttpCode(HttpStatus.OK)
  //   getUsers(@Query() getUserDto: GetUserDto) {
  //     return this.userService.getUsersArg(getUserDto);
  //   }

  //   @Get()
  //   @ApiOkResponse({
  //     description: 'Get user information',
  //   })
  //   @HttpCode(HttpStatus.OK)
  //   @UseGuards(AuthenticationGuard, RolesGuard)
  //   @ApiBearerAuth()
  //   findUser(@Req() req) {
  //     return this.userService.getProfile(req.user);
  //   }

  @Get('get-sas-url')
  @UseGuards(AuthenticationGuard, RolesGuard)
  @ApiBearerAuth()
  getUploadSignedUrl(@Query() input: PutObjectDto, @Req() req) {
    return this.userService.generateSasUrl(input, req.user._id);
  }

  //   @Patch()
  //   @UseGuards(AuthenticationGuard, RolesGuard)
  //   @ApiBearerAuth()
  //   @ApiOkResponse({ type: ResponseDto })
  //   editUserInformation(
  //     @Req() req,
  //     @Body() editUserInfoDto: EditUserInfoDto,
  //   ): Promise<ResponseDto> {
  //     return this.userService.editUserInformation(req.user, editUserInfoDto);
  //   }

  //   @Put('status/:id')
  //   @UseGuards(AuthenticationGuard, RolesGuard)
  //   @ApiBearerAuth()
  //   @ApiOkResponse({ type: ResponseDto })
  //   @Permission({
  //     action: PermissionActions.EDIT_USER_PROFILE,
  //     description: PermissionActions.EDIT_USER_PROFILE,
  //   })
  //   changeUserStatus(
  //     @Req() { user },
  //     @Body() changeStatusDto: ChangeStatusDto,
  //     @Param() idDto: IDDto,
  //   ): Promise<ResponseDto> {
  //     return this.userService.changeUserStatus(user, idDto, changeStatusDto);
  //   }

  //   @Get(':id')
  //   @ApiOkResponse({
  //     type: ResponseGetInfoDto,
  //   })
  //   @HttpCode(HttpStatus.OK)
  //   @UseGuards(AuthenticationGuard, RolesGuard)
  //   @ApiBearerAuth()
  //   @Permission({
  //     action: PermissionActions.VIEW_USER_PROFILE,
  //     description: PermissionActions.VIEW_USER_PROFILE,
  //   })
  //   getUserDetails(
  //     @Req() req,
  //     @Param() idDto: IDDto,
  //   ): Promise<ResponseGetInfoDto> {
  //     return this.userService.getUserInformation(idDto);
  //   }
}
