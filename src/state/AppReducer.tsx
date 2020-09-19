import { Action, AppState } from './types';

export const initialAppState: AppState = {
  isMobile: false,
  baits: [],
  places: [],
};

const appReducer = (state: AppState, action: Action): AppState => {
  console.log(action);
  switch (action.type) {
    case 'SET_IS_MOBILE':
      return {
        ...state,
        isMobile: action.payload.isMobile,
      };

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
