/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';
import App from '../App';
import i18n from '../i18n';

function Page() {
  return (
    <Suspense
      fallback={(
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
    >
      <App />
    </Suspense>
  );
}

export default Page;
