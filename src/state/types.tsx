import { Dispatch } from 'react';
import { Bait, FishingPlace } from '../shared/types';

type ActionType = 'SET_IS_MOBILE' | 'SET_BAITS' | 'SET_PLACES';

export interface AppState {
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
