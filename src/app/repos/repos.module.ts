import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepoContainerComponent } from './repo-container/repo-container.component';
import { RepoListComponent } from './repo-list/repo-list.component';
import { RepoInfoComponent } from './repo-info/repo-info.component';
import { StoreModule } from '@ngrx/store';
import * as fromRepo from './state/repo.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RepoEffects } from './state/repo.effects';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [RepoContainerComponent, RepoListComponent, RepoInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '', component: RepoContainerComponent
    }]),
    StoreModule.forFeature(fromRepo.repoFeatureKey, fromRepo.reducer),
    EffectsModule.forFeature([RepoEffects])
  ]
})
export class RepoModule {
}
