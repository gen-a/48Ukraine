const { mail } = require('../services/mail');

exports.sendNewOrderLetter = (email, number, visaExpirationDate) => {
  //const date = new Date(new Date().setTime(visaExpirationDate)).toUTCString();
  return mail(
    process.env.MAIL_FROM,
    email,
    'Your order has been placed',
    `Your order number is ${number}`,
    `<p>Your order number is ${number}</p>`
  );
};