import { Dispatch } from 'react';
import { Bait, FishingPlace } from '../shared/types';

type ActionType = 'SET_BAITS' | 'SET_PLACES';

export interface AppState {
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
