import * as fromRoot from '../../state/app.state';
import { User } from '../user';

export const userFeatureKey = 'user';

export interface UserState {
  currentUser: User;
}

export interface AppState extends fromRoot.AppState {
  user: UserState;
}

export const initialState: UserState = {
  currentUser: null
};

