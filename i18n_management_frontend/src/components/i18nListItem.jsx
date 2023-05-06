/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemText,
  Grid,
  Typography,
  TextField,
  IconButton,
  Button,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { editLocale } from '../services/locales';

function I18nListItem({
  info,
  listNumber,
  addListItem,
  handleListItem,
  deleteListItem,
  setItemData,
  setAlertInfo,
}) {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { i18n } = useTranslation(['all']);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const iistItem = [
    { col: 'keyword', value: info.keyword },
    { col: 'en', value: info.en },
    { col: 'zh_tw', value: info.zh_tw },
    { col: 'jap', value: info.jap },
  ];

  const renderListItem = (col, value) => {
    if (!edit && info._id) {
      return <ListItemText primary={value} sx={{ minWidth: 250 }} />;
    }

    return (
      <TextField
        title={col}
        value={value}
        onChange={(e) => handleListItem(col, listNumber, e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        required
      />
    );
  };

  return (
    <>
      <ListItem divider>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={1} sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1">{listNumber + 1}</Typography>
          </Grid>

          {iistItem.map((item) => (
            <Grid key={item.col} item xs={2}>
              {renderListItem(item.col, item.value)}
            </Grid>
          ))}

          <Grid item xs={2}>
            {edit || !info._id ? (
              <IconButton
                onClick={async () => {
                  if (info.keyword && info.en && info.zh_tw && info.jap) {
                    if (!info._id) {
                      addListItem(info, listNumber);
                      setEdit(false);
                    } else {
                      try {
                        await editLocale(info);
                        await i18n.reloadResources(['en', 'zh_tw', 'jap']);
                        setAlertInfo((prev) => ({
                          ...prev,
                          alertOpen: true,
                          status: 'success',
                          content: '編輯成功',
                        }));
                        setEdit(false);
                      } catch {
                        setAlertInfo((prev) => ({
                          ...prev,
                          alertOpen: true,
                          status: 'error',
                          content: '編輯失敗，不可有重複關鍵字',
                        }));
                      }
                    }
                  } else {
                    setAlertInfo((prev) => ({
                      ...prev,
                      alertOpen: true,
                      status: 'error',
                      content: '所有欄位都須填寫',
                    }));
                  }
                }}
              >
                <CheckIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  setEdit(true);
                }}
              >
                <EditIcon />
              </IconButton>
            )}

            <IconButton
              onClick={() => {
                if (info._id) {
                  handleDialogOpen();
                } else {
                  setItemData((prev) => {
                    const newData = [...prev];
                    newData.pop();
                    return newData;
                  });
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>刪除語料</DialogTitle>
        <DialogContent sx={{ minWidth: 500 }}>
          <DialogContentText>確定要刪除語料?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>取消</Button>
          <Button
            onClick={() => {
              deleteListItem();
              handleDialogClose();
            }}
            autoFocus
          >
            確定
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default I18nListItem;
