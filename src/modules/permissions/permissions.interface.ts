import { Document } from 'mongoose';

export interface IPermissions {
  action: string;
  description?: string;
}

export type IPermissionsDoc = Document & IPermissions;
