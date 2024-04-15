import { ApiProperty } from '@nestjs/swagger';
import { ToolDto } from './tool.dto';

export class SubmitToolDto {
  @ApiProperty()
  tool: ToolDto;
  @ApiProperty()
  checkoutUrl: string;
}
