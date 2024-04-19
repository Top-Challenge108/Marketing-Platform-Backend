/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
/* eslint-disable @typescript-eslint/ban-types,@typescript-eslint/no-unsafe-argument */
import { applyDecorators, type Type, UseInterceptors } from '@nestjs/common';
import {
  PARAMTYPES_METADATA,
  ROUTE_ARGS_METADATA,
} from '@nestjs/common/constants';
import { RouteParamtypes } from '@nestjs/common/enums/route-paramtypes.enum';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  type ReferenceObject,
  type SchemaObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { reverseObjectKeys } from '@nestjs/swagger/dist/utils/reverse-object-keys.util';
import * as _ from 'lodash';
import { IApiFile } from '../interfaces/api-file.interface';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

function explore(instance: Object, propertyKey: string | symbol) {
  const types: Array<Type<unknown>> = Reflect.getMetadata(
    PARAMTYPES_METADATA,
    instance,
    propertyKey,
  );
  const routeArgsMetadata =
    Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      instance.constructor,
      propertyKey,
    ) || {};

  const parametersWithType = _.mapValues(
    reverseObjectKeys(routeArgsMetadata),
    (param) => ({
      type: types[param.index],
      name: param.data,
      required: true,
    }),
  );

  for (const [key, value] of Object.entries(parametersWithType)) {
    const keyPair = key.split(':');

    if (Number(keyPair[0]) === RouteParamtypes.BODY) {
      return (<any>value).type;
    }
  }
}

function RegisterModels(): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const body = explore(target, propertyKey);

    return body && ApiExtraModels(body)(target, propertyKey, descriptor);
  };
}

function ApiFileDecorator(
  files: IApiFile[] = [],
  options: Partial<{ isRequired: boolean }> = {},
): MethodDecorator {
  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const { isRequired = false } = options;
    const fileSchema: SchemaObject = {
      type: 'string',
      format: 'binary',
    };
    const properties: Record<string, SchemaObject | ReferenceObject> = {};

    for (const file of files) {
      properties[file.name] =
        file.maxCount && file.maxCount > 1
          ? {
              type: 'array',
              items: fileSchema,
            }
          : fileSchema;
    }

    let schema: SchemaObject = {
      properties,
      type: 'object',
    };
    const body = explore(target, propertyKey);

    if (body) {
      schema = {
        allOf: [
          {
            $ref: getSchemaPath(body),
          },
          { properties, type: 'object' },
        ],
      };
    }

    return ApiBody({
      schema,
      required: isRequired,
    })(target, propertyKey, descriptor);
  };
}

export function ApiFile(
  files: IApiFile | IApiFile[],
  options: Partial<{ isRequired: boolean }> = {},
): MethodDecorator {
  return applyDecorators(
    RegisterModels(),
    ApiConsumes('multipart/form-data'),
    ApiFileDecorator(_.castArray(files), options),
    _.isArray(files)
      ? UseInterceptors(FileFieldsInterceptor(files as MulterField[]))
      : UseInterceptors(FileInterceptor((files as IApiFile)?.name)),
  );
}
