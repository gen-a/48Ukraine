const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { mail } = require('../services/mail');
const { createHtml, htmlToText } = require('../lib/mail/generator');

const templatePath = path.resolve(__dirname, './template--new-order.html');

const { MAIL_FROM: emailFrom, HTTP_NAME: siteName } = process.env;

exports.sendNewOrderLetter = (email, number, firstName, lastName) => {
  const html = createHtml(templatePath, { emailFrom, siteName, firstName, lastName, number });
  return mail(
    emailFrom,
    email,
    `Замовлення на сайті ${siteName}`,
    htmlToText(html),
    html,
    [{
      filename: 'image.png',
      path: path.resolve(__dirname, '../../public/images/48-ukraine-logo.png'),
      cid: 'companyLogoImage'
    }]
  );
};