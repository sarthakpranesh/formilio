/* eslint-disable max-len */
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const assert = require('assert');

// chai.use(chaiHttp);

// const requestor = chai.request('https://formilio-backend.herokuapp.com').keepOpen();

// describe('Form Response Routes', () => {
//   describe('Add Response route', () => {
//     it('Correct Request', async () => {
//       await requestor.post('/addResponse')
//           .send({
//             formName:
//             '6e8adae11a6c45acdd4a58d097579ab4:832e88d4f563e1c8286309b009132a',
//             responseFields: {
//               'First Name': 'Sarthak',
//               'Last Name': 'Pranesh',
//               'Email': 'sarthakpranesh08@gmail.com',
//               'Mobile Number': '1234567890',
//             },
//           })
//           .then((resp) => {
//             assert.equal(resp.status, 200);
//           });
//     });

//     it('Incorrect Request Body ( Not passing correct fields )', async () => {
//       await requestor.post('/addResponse')
//           .send({
//             formName:
//             '6e8adae11a6c45acdd4a58d097579ab4:832e88d4f563e1c8286309b009132a',
//             responseFields: {
//               'First Name': 'Sarthak',
//               'Last Name': 'Pranesh',
//               'Email': 'sarthakpranesh08@gmail.com',
//               'Mobile': '1234567890',
//             },
//           })
//           .then((resp) => {
//             assert.equal(resp.body.error.length !== 0, true);
//             assert.equal(resp.status, 200);
//           });
//     });

//     it('Correct Request Body but with extra fields ( tampering )', async () => {
//       await requestor.post('/addResponse')
//           .send({
//             formName:
//             '6e8adae11a6c45acdd4a58d097579ab4:832e88d4f563e1c8286309b009132a',
//             responseFields: {
//               'First Name': 'Sarthak',
//               'Last Name': 'Pranesh',
//               'Email': 'sarthakpranesh08@gmail.com',
//               'Mobile Number': '1234567890',
//               'Something': 'rtfgbvc',
//             },
//           })
//           .then((resp) => {
//             assert.equal(resp.body.error.length !== 0, true);
//             assert.equal(resp.status, 200);
//           });
//     });

//     it('Incorrect Request Body ( Not passing correct form name )', async () => {
//       await requestor.post('/addResponse')
//           .send({
//             formName: '55dfc5a5081dcce1b5638911e321435e:2d9465a96f6w',
//             responseFields: {
//               'First Name': 'Sarthak',
//               'Last Name': 'Pranesh',
//               'Email': 'sarthakpranesh08@gmail.com',
//               'Mobile Number': '1234567890',
//             },
//           })
//           .then((resp) => {
//             assert.equal(resp.body.statusCode, 8);
//             assert.equal(resp.status, 400);
//           });
//     });
//   });
// });

// requestor.close();
