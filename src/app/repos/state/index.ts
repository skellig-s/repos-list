import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, repoFeatureKey, RepoState } from './repo.reducer';

export const selectReposFeature = createFeatureSelector<AppState, RepoState>(repoFeatureKey);

export const selectCurrentRepoId = createSelector(
  selectReposFeature,
  (state: RepoState) => state.currentRepoId
);

export const selectCurrentRepo = createSelector(
  selectReposFeature,
  selectCurrentRepoId,
  (state: RepoState, id: number) => id ? state.repos.find( repo => repo.id === id) : null
);

export const selectRepos = createSelector(
  selectReposFeature,
  (state: RepoState) => state.repos
);

export const selectReposError = createSelector(
  selectReposFeature,
  (state: RepoState) => state.error
);
