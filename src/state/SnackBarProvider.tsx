import { Color } from '@material-ui/lab/Alert';
import React, { createContext, useContext, useState } from 'react';

const SnackBarStateContext = createContext<{
  isActive: boolean;
  message: string;
  severity: Color;
  openSnackBar: (msg: string, severity: Color) => void;
  hideSnackBar: () => void;
}>({} as any);

export const SnackBarStateProvider: React.FC = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Color>('success');

  const openSnackBar = (msg: string, severity: Color) => {
    setMessage(msg);
    setIsActive(true);
    setSeverity(severity);
  };

  const hideSnackBar = () => {
    setIsActive(false);
  };

  return (
    <SnackBarStateContext.Provider value={{ isActive, message, severity, openSnackBar, hideSnackBar }}>
      {children}
    </SnackBarStateContext.Provider>
  );
};

export const useSnackBarState = () => useContext(SnackBarStateContext);
