import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import localeRouter from './routers/localeRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://db:27017/i18n_locales', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/locales', localeRouter);

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
