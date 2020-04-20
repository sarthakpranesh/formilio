/* eslint-disable max-len */
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');

chai.use(chaiHttp);

const requestor = chai.request('localhost:8080').keepOpen();
const token = 'eyJhbGciOiJIUzI1NiJ9.VGhpc0lzTGl2ZXJwb29s.QD0sTbAXKcfYLznPWPTejHIV05xEkJTY9sMjVY0Qmjo';


describe('Form Tests', () => {
  describe('Create Form Test', () => {
    it('Correct Request', async () => {
      await requestor.post('/auth/createForm')
          .set('Authorization', token)
          .send({
            formName: 'Testing123',
            fields: [
              {
                name: 'Username',
                type: 'String',
                regEx: 'wer',
              },
              {
                name: 'Pass',
                type: 'String',
                regEx: 'wer',
              },
            ],
          })
          .then((resp) => {
            assert.equal(resp.status, 200);
          });
    });

    // this request should fail with 400 as two forms can't have same name
    it('Correct request with same form name', async () => {
      await requestor.post('/auth/createForm')
          .set('Authorization', token)
          .send({
            formName: 'Testing123',
            fields: [
              {
                name: 'Username',
                type: 'String',
                regEx: 'wer',
              },
              {
                name: 'Pass',
                type: 'String',
                regEx: 'wer',
              },
            ],
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });

    // this request should fail with 400 as Authorization toke is incorrect or not set
    it('Correct request without Authorization', async () => {
      await requestor.post('/auth/createForm')
          .set('Authorization', 'efdg')
          .send({
            formName: 'Testing123',
            fields: [
              {
                name: 'Username',
                type: 'String',
                regEx: 'wer',
              },
              {
                name: 'Pass',
                type: 'String',
                regEx: 'wer',
              },
            ],
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });

    // this request should fail with 400 as body is improper
    it('Correct request with improper fields', async () => {
      await requestor.post('/auth/createForm')
          .set('Authorization', token)
          .send({
            formName: 'Testing1234',
            fields: 46327,
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });
  });

  describe('Delete Form Test', () => {
    it('Correct Request', async () => {
      await requestor.delete('/auth/deleteForm')
          .set('Authorization', token)
          .query({
            formName: 'Testing123',
          })
          .then((resp) => {
            assert.equal(resp.status, 200);
          });
    });
  });
});

requestor.close();
