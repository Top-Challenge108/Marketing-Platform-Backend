import { Document } from 'mongoose';

export interface IRoles {
  name: string;
  description?: string;
  status?: string;
  permissions: string[];
}

export type IRolesDoc = Document & IRoles;
