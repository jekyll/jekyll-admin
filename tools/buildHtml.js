// Allowing console calls below since this is a build file.
/* eslint-disable no-console */

import fs from 'fs';
import {chalkSuccess, chalkError} from './chalkConfig';
import cheerio from 'cheerio';

fs.readFile('src/index.html', 'utf8', (readError, markup) => {
  if (readError) {
    return console.log(chalkError(readError));
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
  $('head').append('<link rel="stylesheet" href="/admin/styles.css">');

  fs.writeFile('lib/jekyll-admin/public/index.html', $.html(), 'utf8', (writeError) => {
    if (writeError) {
      return console.log(chalkError(writeError));
    }
    console.log(chalkSuccess('index.html written to /lib/jekyll-admin/public/'));

    return writeError;
  });

  return readError;
});
