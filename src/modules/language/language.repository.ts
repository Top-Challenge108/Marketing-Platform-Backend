/* istanbul ignore file */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseAbstractRepository } from '../../base/base.abstract.repository';
import { ILanguagesDoc } from './language.interface';
import { LANGUAGES_MODEL } from './schema/language.schema';
import { Model } from 'mongoose';

@Injectable()
export class LanguagesRepository extends BaseAbstractRepository<ILanguagesDoc> {
  constructor(
    @InjectModel(LANGUAGES_MODEL)
    private readonly permissionsModel: Model<ILanguagesDoc>,
  ) {
    super(permissionsModel);
  }
}
