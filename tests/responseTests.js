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
            formName: '55dfc5a5081dcce1b5638911e321435e:2d9465a96f6e',
            responseFields: {
              username: 'Sarthak',
              regNo: '18BCE0814',
              email: 'sarthakpranesh08@gmail.com',
              block: 'L',
              room: '735',
            },
          })
          .then((resp) => {
            assert.equal(resp.status, 200);
          });
    });

    it('Incorrect Request Body ( Not passing correct fields )', async () => {
      await requestor.post('/addResponse')
          .send({
            formName: '55dfc5a5081dcce1b5638911e321435e:2d9465a96f6e',
            responseFields: {
              username: 'Sarthak',
              regNo: '18BCE0814',
              email: 'sarthakpranesh08@gmail.com',
              roo: '735',
            },
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });

    it('Incorrect Request Body ( Not passing correct form name )', async () => {
      await requestor.post('/addResponse')
          .send({
            formName: '55dfc5a5081dcce1b5638911e321435e:2d9465a96f6w',
            responseFields: {
              username: 'Sarthak',
              regNo: '18BCE0814',
              email: 'sarthakpranesh08@gmail.com',
              block: 'L',
              room: '735',
            },
          })
          .then((resp) => {
            assert.equal(resp.status, 400);
          });
    });

    it('Correct Request Body but with extra fields ( tampering )', async () => {
      await requestor.post('/addResponse')
          .send({
            formName: '55dfc5a5081dcce1b5638911e321435e:2d9465a96f6e',
            responseFields: {
              username: 'Sarthak',
              regNo: '18BCE0814',
              email: 'sarthakpranesh08@gmail.com',
              block: 'L',
              room: '735',
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
