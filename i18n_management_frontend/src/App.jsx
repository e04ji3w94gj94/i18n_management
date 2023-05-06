import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/layout';
import Main from './components/main';

function App() {
  return (
    <>
      <CssBaseline />
      <Layout>
        <Main />
      </Layout>
    </>
  );
}

export default App;
