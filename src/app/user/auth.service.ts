import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

interface OAuthResponse {
  'access_token': string;
  'scope': string;
  'token_type': string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginPopupWindowRef: Window;
  currentUser: User;

  constructor(private http: HttpClient) {
    const userInfo = localStorage.getItem('userInfo');
    this.currentUser = userInfo ? JSON.parse(userInfo) : null;
  }

  public login(): Promise<void> {
    return new Promise((resolve, reject) => {
      window.addEventListener('message', (message) => {
        if (message.origin !== environment.popUpOrigin) {
          return;
        }
        this.closePopupWindow();

        if (message.data) {
          this.saveUserInfo(message.data);
          resolve();
        } else {
          this.clearUserInfo();
          reject();
          // TODO: show error
        }
      }, {
        once: true
      });

      this.loginPopupWindowRef = window.open(
        environment.oAuthData.url
        + '/authorize/?client_id=' + environment.oAuthData.client_id
        + '&redirect_uri=' + encodeURIComponent(environment.oAuthData.redirect_uri)
        + '&scope=' + environment.oAuthData.scope
      );
    });
  }

  public logout(): void {
    this.clearUserInfo();
  }

  public exchangeCodeForToken(code: string): Observable<string> {
    return this.http.post(`${environment.oAuthData.url}/access_token`, {
      client_id: environment.oAuthData.client_id,
      client_secret: environment.oAuthData.client_secret,
      code
    }, {
      headers: new HttpHeaders({
        Accept: 'application/json'
      })
    }).pipe(
      map((response: OAuthResponse) => response.access_token)
    );
  }

  public closePopupWindow(): void {
    this.loginPopupWindowRef.close();
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public saveUser(): void {
    this.http.get('/api/user').pipe(
      map((response: User) => ({avatar_url: response.avatar_url, login: response.login}))
    ).subscribe((user: User) => {
      this.currentUser = user;
      localStorage.setItem('userInfo', JSON.stringify(user));
    });
  }

  private saveUserInfo(token: string): void {
    localStorage.setItem('token', token);
    this.saveUser();
  }

  private clearUserInfo(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }
}
