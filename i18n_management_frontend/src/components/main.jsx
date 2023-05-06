import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import I18nList from './i18nList';

const buttonLng = [
  { lng: 'en', text: '英文' },
  { lng: 'zh_tw', text: '中文' },
  { lng: 'jap', text: '日文' },
];

function Main() {
  const { i18n } = useTranslation(['all']);
  const [selectLng, setSelectLng] = useState('en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectLng(lng);
  };

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ padding: 5, background: '#caf2fc' }}>
        {buttonLng.map((info) => (
          <Button
            sx={{ margin: 1 }}
            variant={`${selectLng === info.lng ? 'contained' : 'outlined'}`}
            onClick={() => changeLanguage(info.lng)}
          >
            {info.text}
          </Button>
        ))}

        <I18nList />
      </Box>
    </Box>
  );
}

export default Main;
