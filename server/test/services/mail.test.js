const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });
const chai = require('chai');
const { mail } = require('../../services/mail');
const { expect } = chai;

const data = {
  from: 'test.from@gmail.com',
  to: 'test.to@gmail.com',
  subject: 'testing emeil',
  text: 'text of the mail',
  html: '<p>HTML</p>',
};


describe('/services/mail.js Tests', () => {
  it('should send email', (done) => {
    const { from, to, subject, text, html } = data;

    mail(from, to, subject, text, html)
      .then((info) => {
        expect(info).to.be.an('object');
        expect(info.accepted).to.be.an('array').that.does.include(data.to);
        done();
      })
      .catch((err) => {
        expect(2).to.equal(1);
        done();
      });
  });
});