export interface IJwtPayload {
  id: string;
  email?: string;
  phone?: string;
  permissions: string[];
  deviceId: string;
  lastUpdatePassword: Date;
  language?: string;
}

export interface IJwtRefreshToken {
  id: string;
  deviceId: string;
  language?: string;
  lastUpdatePassword: Date;
  tokenId: string;
}

export interface IJwtVerifyCodePayload {
  phone: string;
  email: string;
  code?: string;
  iat?: number;
  exp?: number;
  language?: string;
}
