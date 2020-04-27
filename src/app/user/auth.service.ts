import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
  currentUser$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {
  }

  public login(): void {
    window.addEventListener('message', (message) => {
      if (message.origin !== environment.popUpOrigin) {
        return;
      }

      if (message.data) {
        this.saveToken(message.data);
      } else {
        this.clearToken();
        // TODO: show error
      }
      this.closePopupWindow();
    }, {
      once: true
    });

    this.loginPopupWindowRef = window.open(
      environment.oAuthData.url
      + '/authorize/?client_id=' + environment.oAuthData.client_id
      + '&redirect_uri=' + encodeURIComponent(environment.oAuthData.redirect_uri)
      + '&scope=' + environment.oAuthData.scope
    );
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

  public saveUserInfo(): Observable<User> {
    return this.http.get('/api/user').pipe(
      map((response: User) => {
        return { avatar_url: response.avatar_url, login: response.login };
      }),
      tap( user => this.currentUser$.next(user))
    );
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private clearToken(): void {
    localStorage.removeItem('item');
  }
}
