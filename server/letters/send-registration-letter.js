const { mail } = require('../services/mail');

exports.sendRegistrationLetter = (email, password) => {
  return mail(
    process.env.MAIL_FROM,
    email,
    'You have been registered at 48 Ukraine site',
    `Please use password: ${password} to enter the site`,
    `<p>Please use password: ${password} to enter the site</p>`
  );
};