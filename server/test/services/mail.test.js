const config = require('../../config');
const chai = require('chai');
const { mail } = require('../../services/mail');
const { expect } = chai;

const data = {
  from: config.get('app.mailFrom'),
  to: config.get('app.mailFrom'),
  subject: 'testing email',
  text: 'text of the mail',
  html: '<p>HTML</p>',
};


describe('/services/mail.js Tests', function() {
  this.timeout(5000);
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