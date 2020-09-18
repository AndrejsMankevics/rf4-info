import { Action, AppState } from './types';

export const initialAppState: AppState = {
  baits: [],
  places: [],
};

const appReducer = (state: AppState, action: Action): AppState => {
  console.log(action);
  switch (action.type) {
    case 'SET_BAITS':
      return {
        ...state,
        baits: action.payload.baits,
      };

    case 'SET_PLACES':
      return {
        ...state,
        places: action.payload.places,
      };

    default:
      return state;
  }
};

export default appReducer;
