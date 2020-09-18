import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { Action, AppState } from './types';

const AppStateContext = createContext<[AppState, Dispatch<Action>]>({} as any);

interface AppStateProviderProps {
  reducer: (state: AppState, action: Action) => AppState;
  initialState: AppState;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ reducer, initialState, children }) => (
  <AppStateContext.Provider value={useReducer(reducer, initialState)}>{children}</AppStateContext.Provider>
);

export const useAppStateValue = () => useContext(AppStateContext);
