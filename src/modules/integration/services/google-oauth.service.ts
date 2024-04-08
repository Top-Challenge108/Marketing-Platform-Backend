import { Injectable } from '@nestjs/common';
import type { Auth } from 'googleapis';
import { google } from 'googleapis';
import { googleOAuthConfig } from '../../../configs/configs.constants';

@Injectable()
export class GoogleOAuthService {
  private oauthClient: Auth.OAuth2Client;

  constructor() {
    this.oauthClient = new google.auth.OAuth2(
      googleOAuthConfig.CLIENT_ID,
      googleOAuthConfig.CLIENT_SECRET,
    );
  }

  async getUserDataFromToken(token: string) {
    try {
      const { userinfo: userInfoClient } = google.oauth2('v2');
      this.oauthClient.setCredentials({
        access_token: token,
      });
      const { data } = await userInfoClient.get({
        auth: this.oauthClient,
      });

      return data;
    } catch {
      return null;
    }
  }
}
