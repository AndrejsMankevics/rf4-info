import React from 'react';

export interface AppContextProps {
  isMobile: boolean;
}

const AppContext = React.createContext<AppContextProps>({
  isMobile: false,
});

export default AppContext;
