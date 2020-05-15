/* eslint-disable max-len */
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');
require('../app');

chai.use(chaiHttp);

// const requestor = chai.request('localhost:8080').keepOpen();
const requestor = chai.request('localhost:8080').keepOpen();
let id = '';


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
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Password too short (6-40 characters)', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwer',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Password to long (6-40 characters)', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwe',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Bad request - email field missing', async () => {
      await requestor.post('/createUser')
          .send({
            password: 'qwertyuiop',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Bad request - password field missing', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
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
            assert.equal(resp.body.statusCode, 1);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, true);
            assert.equal(resp.status, 200);
          });
    }).timeout(10000);

    it('Correct request but Email already registered', async () => {
      await requestor.post('/createUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwertyuiop',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });
  });

  describe('Sign In User', () => {
    it('Bad Email Format', async () => {
      await requestor.post('/signInUser')
          .send({
            email: 'sadfghjfgh',
            password: 'qwertyuiop',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Password too short (6-40 characters)', async () => {
      await requestor.post('/signInUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwer',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Password to long (6-40 characters)', async () => {
      await requestor.post('/signInUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwertyuiopqwertyuiopqwertyuiopqwertyuiopqwe',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Bad request - email field missing', async () => {
      await requestor.post('/signInUser')
          .send({
            password: 'qwertyuiop',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('Bad request - password field missing', async () => {
      await requestor.post('/signInUser')
          .send({
            email: 'testingEmail@gmail.com',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 8);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.isUserCreated, false);
            assert.equal(resp.status, 400);
          });
    });

    it('UnRegistered User', async () => {
      await requestor.post('/signInUser')
          .send({
            email: 'rthwdefjgbhyb@gmail.com',
            password: 'qwertyuiop',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 6);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.payload, null);
            assert.equal(resp.status, 200);
          });
    });

    it('Registered User - wrong password', async () => {
      await requestor.post('/signInUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwergfdghfcgg',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 7);
            assert.equal(resp.body.status, resp.status);
            assert.equal(resp.body.payload, null);
            assert.equal(resp.status, 403);
          });
    });

    it('Correct request', async () => {
      await requestor.post('/signInUser')
          .send({
            email: 'testingEmail@gmail.com',
            password: 'qwertyuiop',
          })
          .then((resp) => {
            assert.equal(resp.body.statusCode, 1);
            assert.equal(resp.body.error, null);
            assert.equal(resp.body.status, resp.status);
            assert.equal(!!resp.body.payload.signInToken, true);
            assert.equal(resp.status, 200);

            id = resp.body.payload.user._id;
          });
    });
  });

  describe('cleaning residue', () => {
    it('removing test user', async () => {
      await requestor.delete('/auth/deleteUser')
          .send({
            id,
          })
          .then((resp) => {
            assert.equal(resp.status, 200);
          });
    });
  });
});

requestor.close();
