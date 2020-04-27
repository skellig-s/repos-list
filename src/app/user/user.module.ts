import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RedirectResolver } from './redirect/redirect.resolver';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [LoginComponent, RedirectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent },
      {
        path: 'redirect',
        component: RedirectComponent,
        resolve: { access_token: RedirectResolver }
      }
    ]),
    StoreModule.forFeature('users', [])
  ]
})
export class UserModule { }
