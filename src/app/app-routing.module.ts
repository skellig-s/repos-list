import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './core/welcome/welcome.component';

const appRoutes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./user/user.module').then(module => module.UserModule)
  }, {
    path: 'repos',
    loadChildren: () => import('./repos/repos.module').then(m => m.RepoModule)
  },
  {path: '**', component: WelcomeComponent}
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
