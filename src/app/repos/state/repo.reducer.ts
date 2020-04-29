import * as repoActions from './repo.actions';
import * as fromRoot from '../../state/app.state';
import { Repo } from '../repo';
import { Action, createReducer, on } from '@ngrx/store';

export const repoFeatureKey = 'repos';

export interface RepoState {
  currentRepoId: number;
  repos: Repo[];
  error: string;
}

export interface AppState extends fromRoot.AppState {
  repos: RepoState;
}

export const initialState: RepoState = {
  currentRepoId: null,
  repos: [],
  error: ''
};

const repoReducer = createReducer(
  initialState,
  on(repoActions.initializeReposSuccess, (state: RepoState, {repos}) => ({
    ...state,
    repos,
    error: ''
  })),
  on(repoActions.initializeReposFail, (state: RepoState, {error}) => ({
    ...state,
    repos: [],
    error
  })),
  on(repoActions.setCurrentRepo, (state: RepoState, currentRepo: Repo) => {
    return {
      ...state,
      currentRepoId: currentRepo.id
    };
  }),
  on(repoActions.enrichCurrentRepo, (state: RepoState, {contributors}) => {
    const newRepos = state.repos.map((repo) =>
      repo.id === state.currentRepoId ? {
          ...repo,
          contributors
        }
        : repo
    );
    return {
      ...state,
      repos: newRepos
    };
  }),
  // on(repoActions.enrichCurrentRepoFail, (state: RepoState, {error}) => {
  //   const newRepos = state.repos.map((repo) =>
  //     repo.id === state.currentRepoId ? {
  //         ...repo,
  //         contributors
  //       }
  //       : repo
  //   );
  //   return {...
  //     state;
  //   };
  // }),
  on(repoActions.cleanCurrentRepo, (state: RepoState) => ({
    ...state,
    currentRepoId: null
  }))
);

export function reducer(state: RepoState | undefined, action: Action): RepoState {
  return repoReducer(state, action);
}
