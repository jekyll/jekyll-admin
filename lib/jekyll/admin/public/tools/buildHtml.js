// Allowing console calls below since this is a build file.
/* eslint-disable no-console */

import fs from 'fs';
import {chalkSuccess, chalkError, chalkWarning} from './chalkConfig';
import cheerio from 'cheerio';

fs.readFile('src/index.html', 'utf8', (readError, markup) => {
  if (readError) {
    return console.log(chalkError(readError));
  }

  const $ = cheerio.load(markup);

  // since a separate spreadsheet is only utilized for the production build, need to dynamically add this here.
  $('head').append('<link rel="stylesheet" href="/styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', (writeError) => {
    if (writeError) {
      return console.log(chalkError(writeError));
    }
    console.log(chalkSuccess('index.html written to /dist'));

    return writeError;
  });

  return readError;
});
