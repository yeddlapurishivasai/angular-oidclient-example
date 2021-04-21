import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User, WebStorageStateStore } from 'oidc-client';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user: any = null;
  constructor() {
    this.manager.getUser().then(user => {
        this.user = user;
    });
}
  private manager = new UserManager(getClientSettings());

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
}

getClaims(): any {
  return this.user.profile;
}

getAuthorizationHeaderValue(): string {
  return `Bearer ${this.user.id_token}`;
}

startAuthentication(): Promise<void> {
  return this.manager.signinRedirect();
}

completeAuthentication(): Promise<void> {
  return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
      console.log(this.user);
  });
}
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'https://localhost:44340',
    client_id: 'angular_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type:"id_token token",
    scope:"openid",
    filterProtocolClaims: true,
    loadUserInfo: true,
    userStore: new WebStorageStateStore({ store: window.localStorage })
};
}
