import { Dispatch } from 'react';
import { Bait, FishingPlace } from '../shared/types/game';
import { UserData } from '../shared/types/user';

type ActionType = 'SET_USER' | 'SET_IS_MOBILE' | 'SET_BAITS' | 'SET_PLACES';

export interface AppState {
  user: UserData | null;
  isMobile: boolean;
  places: FishingPlace[];
  baits: Bait[];
}

export interface Action {
  type: ActionType;
  payload: any;
}

export interface AppStateValue {
  state: AppState;
  dispatch: Dispatch<Action>;
}
