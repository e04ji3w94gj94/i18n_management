/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chip, List, ListItem, Grid, ListItemText, Button,
} from '@mui/material';
import I18nListItem from './i18nListItem';
import { getLocales, addLocale, deleteLocale } from '../services/locales';
import AlertInfo from './alertInfo';

function I18nList() {
  const { i18n, t } = useTranslation(['all']);
  const isEffectCalledRef = useRef(false);
  const [itemData, setItemData] = useState([
    {
      keyword: '',
      en: '',
      zh_tw: '',
      jap: '',
    },
  ]);
  const [alertInfo, setAlertInfo] = useState({ open: false, status: 'success', content: '' });

  useEffect(() => {
    if (!isEffectCalledRef.current) {
      isEffectCalledRef.current = true;
      const getLocalesData = async () => {
        try {
          const response = await getLocales();
          const { data } = response;
          if (data.length !== 0) {
            setItemData(data);
          }
        } catch {
          setAlertInfo((prev) => ({
            ...prev,
            alertOpen: true,
            status: 'error',
            content: '尚無資料',
          }));
        }
      };

      getLocalesData();
    }
  }, []);

  const newListItem = () => {
    setItemData((prev) => [
      ...prev,
      {
        keyword: '',
        en: '',
        zh_tw: '',
        jap: '',
      },
    ]);
  };

  const addListItem = async (info, idx) => {
    try {
      const response = await addLocale(info);
      await i18n.reloadResources();
      const { data } = response;
      const newData = [...itemData];
      newData[idx] = { ...newData[idx], _id: data._id };

      setItemData(newData);
      setAlertInfo((prev) => ({
        ...prev,
        alertOpen: true,
        status: 'success',
        content: '新增成功',
      }));
    } catch {
      setAlertInfo((prev) => ({
        ...prev,
        alertOpen: true,
        status: 'error',
        content: '新增失敗，不可有重複關鍵字',
      }));
    }
  };

  const handleListItem = (col, idx, value) => {
    const newData = [...itemData];

    newData[idx] = { ...newData[idx], [col]: value };
    setItemData(newData);
  };

  const deleteListItem = async (idx, _id) => {
    const newData = [...itemData].filter((_, index) => index !== idx);

    if (_id) {
      try {
        await deleteLocale(_id);
        await i18n.reloadResources();
        setAlertInfo((prev) => ({
          ...prev,
          alertOpen: true,
          status: 'success',
          content: '刪除成功',
        }));
        setItemData(newData);
      } catch {
        setAlertInfo((prev) => ({
          ...prev,
          alertOpen: true,
          status: 'error',
          content: '刪除失敗',
        }));
      }
    }
  };

  return (
    <>
      <div>
        {itemData.map(
          (data, idx) => data.keyword && <Chip key={idx} label={t(data.keyword)} sx={{ margin: 1 }} />,
        )}
      </div>

      <List>
        <ListItem divider>
          <Grid container spacing={1}>
            <Grid item xs={1} sx={{ textAlign: 'center' }}>
              <ListItemText primary="序列" />
            </Grid>

            <Grid item xs={2}>
              <ListItemText primary="關鍵字" />
            </Grid>

            <Grid item xs={2}>
              <ListItemText primary="英文" />
            </Grid>

            <Grid item xs={2}>
              <ListItemText primary="中文" />
            </Grid>

            <Grid item xs={2}>
              <ListItemText primary="日文" />
            </Grid>
          </Grid>
        </ListItem>
        {itemData.map((data, idx) => (
          <I18nListItem
            key={idx}
            info={data}
            listNumber={idx}
            addListItem={addListItem}
            deleteListItem={() => deleteListItem(idx, data._id)}
            handleListItem={handleListItem}
            setItemData={setItemData}
            setAlertInfo={setAlertInfo}
          />
        ))}
        <Button variant="contained" fullWidth onClick={() => newListItem()}>
          新增
        </Button>
      </List>
      <AlertInfo
        alertOpen={alertInfo.alertOpen}
        status={alertInfo.status}
        info={alertInfo.content}
        onClose={() => {
          setAlertInfo((prev) => ({ ...prev, alertOpen: false }));
        }}
      />
    </>
  );
}

export default I18nList;
