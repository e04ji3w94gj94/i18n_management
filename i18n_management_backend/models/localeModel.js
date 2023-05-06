import mongoose from 'mongoose';

const localeSchema = new mongoose.Schema(
  {
    keyword: { type: String, required: true, unique: true  },
    en: { type: String, required: true},
    zh_tw: { type: String, required: true },
    jap: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);
const Locale = mongoose.model('Locale', localeSchema);
export default Locale;
