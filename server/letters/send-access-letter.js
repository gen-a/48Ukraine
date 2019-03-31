const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { mail } = require('../services/mail');
const { createHtml, htmlToText } = require('../lib/mail/generator');

const templatePath = path.resolve(__dirname, './template--access.html');
const emailFrom = process.env.MAIL_FROM;
const siteName = process.env.HTTP_NAME;

exports.sendAccessLetter = (email, visa, visaExpirationDate) => {
  const time = new Date(new Date().setTime(visaExpirationDate)).toUTCString();
  const access = `/enter-account/${visa}`;
  const html = createHtml(templatePath, { emailFrom, access, siteName, time });

  return mail(
    emailFrom,
    email,
    `Відновлення доступу на сайт ${siteName}`,
    htmlToText(html),
    html
  );
};