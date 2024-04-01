export interface IJwtPayload {
  _id: string;
  email?: string;
  phone?: string;
  permissions: string[];
  deviceId: string;
  lastUpdatePassword: Date;
  language?: string;
}

export interface IJwtRefreshToken {
  _id: string;
  deviceId: string;
  language?: string;
  lastUpdatePassword: Date;
}

export interface IJwtVerifyCodePayload {
  phone: string;
  email: string;
  code?: string;
  iat?: number;
  exp?: number;
  language?: string;
}
