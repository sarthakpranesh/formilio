const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');

chai.use(chaiHttp);

const requestor = chai.request('https://formilio-backend.herokuapp.com').keepOpen();

describe('Form Response Routes', () => {
  describe('Add Response route', () => {
    it('Correct Request', async () => {
      await requestor.post('/addResponse')
          .send({
            formName: 'test',
            responseFields: {
              username: 'Sarthak',
            },
          })
          .then((resp) => {
            assert.equal(resp.status, 200);
          });
    });

    it('Incorrect Request Body ( Not passing correct fields )', async () => {
      await requestor.post('/addResponse')
          .send({
            formName: 'test',
            responseFields: {
              name: 'Sarthak',
            },
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });

    it('Incorrect Request Body ( Not passing correct form name )', async () => {
      await requestor.post('/addResponse')
          .send({
            formName: 'testing as this is not there',
            responseFields: {
              name: 'Sarthak',
            },
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });

    it('Correct Request Body but with extra fields ( tampering )', async () => {
      await requestor.post('/addResponse')
          .send({
            formName: 'test',
            responseFields: {
              username: 'Sarthak',
              hacking: 'But would not be able too',
            },
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });
  });
});

requestor.close();
