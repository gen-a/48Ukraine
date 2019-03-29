const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { mail } = require('../services/mail');

exports.sendAccessLetter = (email, visa, visaExpirationDate) => {
  const date = new Date(new Date().setTime(visaExpirationDate)).toUTCString();
  return mail(
    process.env.MAIL_FROM,
    email,
    'Reset temporary access link',
    `Temporary access link: /enter-account/${visa} valid till ${date}`,
    `<p>Temporary access link: /enter-account/${visa} valid till ${date}</p>
     <p>If you did not ask it just ignore this letter</p>`
  );
};