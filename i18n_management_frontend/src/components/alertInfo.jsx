import React from 'react';
import { Alert, Snackbar } from '@mui/material';

function AlertInfo({
  alertOpen, status, info, onClose,
}) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={alertOpen}
      autoHideDuration={5000}
      onClose={onClose}
    >
      <Alert variant="filled" onClose={onClose} severity={status}>
        {info}
      </Alert>
    </Snackbar>
  );
}

export default AlertInfo;
