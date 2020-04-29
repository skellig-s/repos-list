import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { enrichCurrentRepo, enrichCurrentRepoFail, initializeReposFail, initializeReposSuccess, RepoActionTypes } from './repo.actions';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { RepoService } from '../repo.service';
import { Repo } from '../repo';
import { of } from 'rxjs';
import { AuthService } from '../../user/auth.service';

@Injectable()
export class RepoEffects {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private repoService: RepoService) {
  }

  initializeRepos$ = createEffect(() => this.actions$.pipe(
    ofType(RepoActionTypes.initializeRepos),
    mergeMap(() => this.repoService.getRepos().pipe(
      map((repos: Repo[]) => initializeReposSuccess({
        repos: repos.map((repo) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          contributors: []
        }))
      })),
      catchError(error => of(initializeReposFail({error: error.error.message})))
    ))
  ));

  setCurrentRepos$ = createEffect(() => this.actions$.pipe(
    ofType(RepoActionTypes.setCurrentRepo),
    filter((repo: Repo) => !repo.contributors.length),
    mergeMap((repo: Repo) =>
        this.repoService.getRepoContributors(this.authService.currentUser.login, repo.name).pipe(
          map((contributors: { login: string }[]) => enrichCurrentRepo(
            {contributors: contributors.map(contributor => contributor.login)}
          )),
          catchError(error => of(enrichCurrentRepoFail({error})))
        )
    )
  ));
}
