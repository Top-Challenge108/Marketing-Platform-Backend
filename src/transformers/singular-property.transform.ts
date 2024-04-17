import { Injectable, type PipeTransform } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class SingularPropertyPipeTransform implements PipeTransform<any> {
  transform(value: any): any {
    const transformedValue: Record<string, any> = {};

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];

        transformedValue[key] =
          _.isArray(element) && element.length === 1
            ? _.first(element)
            : element;
      }
    }

    return transformedValue;
  }
}
