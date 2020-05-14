// /* eslint-disable max-len */
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const assert = require('assert');

// chai.use(chaiHttp);

// const requestor = chai.request('https://formilio-backend.herokuapp.com').keepOpen();
// const token = 'eyJhbGciOiJIUzI1NiJ9.VGhpc0lzTGl2ZXJwb29s.QD0sTbAXKcfYLznPWPTejHIV05xEkJTY9sMjVY0Qmjo';


// describe('Form Tests', () => {
//   describe('Create Form Test', () => {
//     it('Correct Request', async () => {
//       await requestor.post('/auth/createForm')
//           .set('Authorization', token)
//           .send({
//             formName: 'Testing123',
//             fields: [
//               {
//                 name: 'Username',
//                 regEx: 'alpha',
//               },
//               {
//                 name: 'Pass',
//                 regEx: 'alphaNumeric',
//               },
//             ],
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 200);
//           });
//     });

//     // this request should fail with 400 as two forms can't have same name
//     it('Correct request with same form name', async () => {
//       await requestor.post('/auth/createForm')
//           .set('Authorization', token)
//           .send({
//             formName: 'Testing123',
//             fields: [
//               {
//                 name: 'Username',
//                 regEx: 'alpha',
//               },
//               {
//                 name: 'Pass',
//                 regEx: 'alphaNumeric',
//               },
//             ],
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 400);
//           });
//     });

//     // this request should fail with 400 as Authorization toke is incorrect or not set
//     it('Correct request without Authorization', async () => {
//       await requestor.post('/auth/createForm')
//           .set('Authorization', 'efdg')
//           .send({
//             formName: 'Testing123',
//             fields: [
//               {
//                 name: 'Username',
//                 regEx: 'alpha',
//               },
//               {
//                 name: 'Pass',
//                 regEx: 'alphaNumeric',
//               },
//             ],
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 400);
//           });
//     });

//     // this request should fail with 400 as body is improper
//     it('Correct request with improper fields', async () => {
//       await requestor.post('/auth/createForm')
//           .set('Authorization', token)
//           .send({
//             formName: 'Testing1234',
//             fields: 46327,
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 400);
//           });
//     });
//   });

//   describe('Delete Form Test', () => {
//     it('Correct Request', async () => {
//       await requestor.delete('/auth/deleteForm')
//           .set('Authorization', token)
//           .query({
//             formName: 'Testing123',
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 200);
//           });
//     });
//   });

//   describe('Request Form Test', () => {
//     it('Correct Request', async () => {
//       await requestor.get('/requestForm')
//           .set('Authorization', token)
//           .query({
//             formName: '6e8adae11a6c45acdd4a58d097579ab4:832e88d4f563e1c8286309b009132a',
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 200);
//           });
//     });

//     it('Incorrect Request ( Improper form name )', async () => {
//       await requestor.get('/requestForm')
//           .set('Authorization', token)
//           .query({
//             formName: '55dfc5a5081dcce1b5638911e321435e:2d946ed96f6e',
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 400);
//           });
//     });
//   });
// });

// requestor.close();
