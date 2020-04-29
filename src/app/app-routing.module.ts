import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RedirectComponent } from './user/redirect/redirect.component';
import { RedirectResolver } from './user/redirect/redirect.resolver';

const appRoutes: Routes = [
  {
    path: '', component: LoginComponent
  }, {
    path: 'login/redirect',
    component: RedirectComponent,
    resolve: { access_token: RedirectResolver }
  }, {
    path: 'repos',
    loadChildren: () => import('./repos/repos.module').then(m => m.RepoModule),
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
