const path = require('path');

const config = require('../config');
const { mail } = require('../services/mail');
const { createHtml, htmlToText } = require('../lib/mail/generator');

const templatePath = path.resolve(__dirname, './template--new-order.html');

const emailFrom = config.get('app.mailFrom');
const siteName = config.get('app.httpName');

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