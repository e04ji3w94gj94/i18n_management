#!/usr/bin/env node

const program = require('commander');
const axios = require('axios');
const fs = require('fs');
const paths = require('path');

const handleLngInfo = ({
  url = 'localhost',
  port = 5000,
  path = '/src/assets/locales',
  language = 'en, jap, zh_tw',
}) => {
  const getLngList = language.split(', ').map((lng) => ({
    url: `http://${url}:${port}/api/locales/getLng/${lng}`,
    path: `${paths.join(process.cwd(), `${path}/${lng}`)}`,
    lng,
  }));

  return getLngList;
};

program.version('0.1.0');
program
  .command('getData')
  .description('Get locales json')
  .option('--url <string>', 'backend server url')
  .option('-p, --port <string>', 'backend server port')
  .option('--path <string>', 'store locales json path')
  .option('--lng <string>', 'select locales language')
  .action(function () {
    const options = this.opts();

    handleLngInfo(options).forEach((info) => {
      axios
        .get(info.url)
        .then((response) => {
          if (!fs.existsSync(info.path)) {
            fs.mkdirSync(info.path, { recursive: true });
          }

          fs.writeFile(`${info.path}/${info.lng}.json`, JSON.stringify(response.data), (err) => {
            if (err) {
              console.error(err);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });

program.parse(process.argv);
