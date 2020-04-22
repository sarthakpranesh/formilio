const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('assert');

chai.use(chaiHttp);

const requestor = chai.request('https://formilio-backend.herokuapp.com').keepOpen();

describe('Default Index server ping route', () => {
  it('Check if server pink runs', async () => {
    await requestor.get('/')
        .then((resp) => {
          assert.equal(resp.status, 200);
        });
  });
});

requestor.close();
