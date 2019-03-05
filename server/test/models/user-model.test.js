const { expect } = require('chai');
const User = require('../../models/user-model');
const { connect } = require('../../config/mongoose');

before((done) => {
  connect()
    .then((res) => done())
    .catch(console.log);
});

describe('Validations: ', () => {

  describe('Required fields', () => {
    const user = new User();
    it('should be invalid if email is empty', (done) => {
      user.validate((err) => {
        expect(err.errors.email).to.exist;
        done();
      });
    });
    it('should be invalid if password is empty', (done) => {
      user.validate((err) => {
        expect(err.errors.password).to.exist;
        done();
      });
    });
  });

  describe('Invalid fields', () => {

    it('should be failed if email is not valid', (done) => {
      const user = new User({ email: '222' });
      user.validate((err) => {
        expect(err.errors.email).to.exist;
        done();
      });
    });
    it('should be failed if password is too short', (done) => {
      const user = new User({ password: '1' });
      user.validate((err) => {
        expect(err.errors.password).to.exist;
        done();
      });
    });
    it('should be failed if password is too long', (done) => {
      const user = new User({ password: '1111111111111111111111' });
      user.validate((err) => {
        expect(err.errors.password).to.exist;
        done();
      });
    });
    it('should be failed if first name is too short', (done) => {
      const user = new User({ first_name: '2' });
      user.validate((err) => {
        expect(err.errors.first_name).to.exist;
        done();
      });
    });
    it('should be failed if last name is too short', (done) => {
      const user = new User({ last_name: '2' });
      user.validate((err) => {
        expect(err.errors.last_name).to.exist;
        done();
      });
    });
  });

  describe('Valid data', () => {
    it('should be succeed with valid data', (done) => {
      const user = new User({
        password: '098yuiRTY',
        first_name: 'john',
        last_name: 'smith',
        email: 'uniqueemail@gmail.com'
      });
      user.validate((err) => {
        if (err !== null) {
          console.log(err.errors);
        }
        expect(err).to.be.a('null');
        done();
      });
    });
  });

});
