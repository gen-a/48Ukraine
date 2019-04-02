const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { mail } = require('../services/mail');
const { createHtml, htmlToText } = require('../lib/mail/generator');

const templatePath = path.resolve(__dirname, './template--registration.html');

const { MAIL_FROM: emailFrom, HTTP_NAME: siteName } = process.env;

exports.sendRegistrationLetter = (email, password) => {
  const html = createHtml(templatePath, { emailFrom, email, siteName, password });
  return mail(
    emailFrom,
    email,
    `Реєстрація на сайті ${siteName}`,
    htmlToText(html),
    html,
    [{
      filename: 'image.png',
      path: path.resolve(__dirname, '../../public/images/48-ukraine-logo.png'),
      cid: 'companyLogoImage'
    }]
  );
};


