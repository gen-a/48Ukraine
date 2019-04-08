const path = require('path');

const config = require('../config');
const { mail } = require('../services/mail');
const { createHtml, htmlToText } = require('../lib/mail/generator');

const templatePath = path.resolve(__dirname, './template--registration.html');

const emailFrom = config.get('app.mailFrom');
const siteName = config.get('app.httpName');

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
