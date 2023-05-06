import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Locale from '../models/localeModel.js';

const localeRouter = express.Router();

localeRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    const createdLocales = await Locale.insertMany(data.locales);
    res.send({ createdLocales });
  }),
);

localeRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const locales = await Locale.find({});
    res.send(locales);
  }),
);

localeRouter.get(
  '/getLng/:lng',
  expressAsyncHandler(async (req, res) => {
    const locales = await Locale.find({});
    const { lng } = req.params;

    const localeData = locales.reduce((acc, cur) => {
      acc[cur.keyword] = cur[lng];
      return acc;
    }, {});

    res.send(localeData);
  }),
);

localeRouter.post(
  '/add',
  expressAsyncHandler(async (req, res) => {
    const locale = new Locale({
      keyword: req.body.keyword,
      en: req.body.en,
      zh_tw: req.body.zh_tw,
      jap: req.body.jap,
    });

    const createdLocale = await locale.save();
    res.send({
      _id: locale._id,
      keyword: createdLocale.keyword,
      en: createdLocale.en,
      zh_tw: createdLocale.zh_tw,
      jap: createdLocale.jap,
    });
  }),
);

localeRouter.put(
  '/edit',
  expressAsyncHandler(async (req, res) => {
    const locale = await Locale.findById(req.body._id);
    if (locale) {
      locale.keyword = req.body.keyword || locale.keyword;
      locale.en = req.body.en || locale.en;
      locale.zh_tw = req.body.zh_tw || locale.zh_tw;
      locale.jap = req.body.jap || locale.jap;

      const updatedLocale = await locale.save();

      res.send({
        _id: updatedLocale._id,
        keyword: updatedLocale.keyword,
        en: updatedLocale.en,
        zh_tw: updatedLocale.zh_tw,
        jap: updatedLocale.jap,
      });
    }
  }),
);

localeRouter.delete(
  '/delete/:id',
  expressAsyncHandler(async (req, res) => {
    const locale = await Locale.findById(req.params.id);

    if (locale) {
      await Locale.deleteOne({ _id: req.params.id });
      res.json({ message: 'Locale deleted' });
    } else {
      res.status(404).send({ message: 'Locale Not Found' });
    }
  }),
);

export default localeRouter;
