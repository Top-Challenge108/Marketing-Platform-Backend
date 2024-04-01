import { Document } from 'mongoose';

export interface IUserRole {
  userId: string;
  roleId: string;
}

export type IUserRoleDoc = Document & IUserRole;
