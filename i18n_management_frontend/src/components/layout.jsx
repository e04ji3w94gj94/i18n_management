import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Layout({ children }) {
  return (
    <>
      <AppBar color="primary" position="static" style={{ height: 64 }}>
        <Toolbar sx={{ height: 64 }}>
          <Typography color="inherit">i18n Management</Typography>
        </Toolbar>
      </AppBar>
      {children}
    </>
  );
}

export default Layout;
