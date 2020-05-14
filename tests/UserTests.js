/* eslint-disable max-len */
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');

chai.use(chaiHttp);

const requestor = chai.request('https://formilio-backend.herokuapp.com').keepOpen();
const token = '';


describe('User Route Tests', () => {
  describe('Sign Up User', () => {
    it('Bad Email Format', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'sadfghjfgh',
            password: 'qwertyuiop',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.userToken, null);
            assert.equal(resp.status, 200);
          });
    });

    it('Password too short (6-40 characters)', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwer',
          })
          .then((resp) => {
            console.log(resp.body);
            assert.equal(resp.status, 400);
          });
    });

    it('Password to long (6-40 characters)', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiopqwertyuiop',
          })
          .then((resp) => {
            console.log(resp.body);
            assert.equal(resp.status, 400);
          });
    });

    it('Bad request - email field missing', async () => {
      await requestor.post('/createUser')
          .send({
            password: 'qwertyuiop',
          })
          .then((resp) => {
            console.log(resp.body);
            assert.equal(resp.status, 400);
          });
    });

    it('Bad request - password field missing', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
          })
          .then((resp) => {
            console.log(resp.body);
            assert.equal(resp.status, 400);
          });
    });

    it('Correct request', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwertyuiop',
          })
          .then((resp) => {
            console.log(resp.body);
            assert.equal(resp.status, 200);
          });
    });
  });
});

requestor.close();
