import { createAction, props } from '@ngrx/store';
import { Repo } from '../repo';

export enum RepoActionTypes {
  initializeRepos = '[Repo] Initialize repos',
  initializeReposSuccess = '[Repo] Initialize repos success',
  initializeReposFail = '[Repo] Initialize repos fail',

  setCurrentRepo = '[Repo] Set current repo',
  enrichCurrentRepo = '[Repo] Enrich current repo',
  enrichCurrentRepoFail = '[Repo] Enrich current repo fail',
  cleanCurrentRepo = '[Repo] Clean current repo',

  load = '[Repo] Load',
  loadSuccess = '[Repo] Load success',
  loadFail = '[Repo] Load fail'
}

export const initializeRepos = createAction(RepoActionTypes.initializeRepos);
export const initializeReposSuccess = createAction(RepoActionTypes.initializeReposSuccess, props<{repos: Repo[]}>());
export const initializeReposFail = createAction(RepoActionTypes.initializeReposFail, props<{error: string}>());

export const setCurrentRepo = createAction(RepoActionTypes.setCurrentRepo, props<Repo>());
export const enrichCurrentRepo = createAction(RepoActionTypes.enrichCurrentRepo, props<{contributors: string[]}>());
export const enrichCurrentRepoFail = createAction(RepoActionTypes.enrichCurrentRepoFail, props<{error: string}>());
export const cleanCurrentRepo = createAction(RepoActionTypes.cleanCurrentRepo);
