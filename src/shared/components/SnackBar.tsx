import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { useSnackBarState } from '../../state/SnackBarProvider';

const SnackBar: React.FC = () => {
  const { isActive, message, severity, hideSnackBar } = useSnackBarState();

  return (
    <Snackbar open={isActive} autoHideDuration={6000} onClose={hideSnackBar}>
      <MuiAlert elevation={6} variant="filled" onClose={hideSnackBar} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackBar;
