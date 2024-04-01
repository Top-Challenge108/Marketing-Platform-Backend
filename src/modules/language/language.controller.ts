import { Controller } from '@nestjs/common';
import { LanguageService } from './language.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('language')
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}
}
