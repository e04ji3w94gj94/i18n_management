/* eslint-disable no-underscore-dangle */
import axios from 'axios';

export const getLocales = async () => {
  const url = '/api/locales';

  return axios({
    method: 'GET',
    url,
  });
};

export const addLocale = (info) => {
  const url = '/api/locales/add';

  const payload = {
    keyword: info.keyword,
    en: info.en,
    zh_tw: info.zh_tw,
    jap: info.jap,
  };

  return axios({
    method: 'POST',
    url,
    data: payload,
  });
};

export const editLocale = async (info) => {
  const url = '/api/locales/edit';

  const payload = {
    _id: info._id,
    keyword: info.keyword,
    en: info.en,
    zh_tw: info.zh_tw,
    jap: info.jap,
  };

  return axios({
    method: 'PUT',
    url,
    data: payload,
  });
};

export const deleteLocale = async (id) => {
  const url = `/api/locales/delete/${id}`;

  return axios({
    method: 'Delete',
    url,
  });
};
