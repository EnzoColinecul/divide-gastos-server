const request = require('supertest');
const auth = require('../../routes/router');

describe('test login route', () => {
  it('Http status code 200', (done) => {
    request(auth)
      .post('/api/auth/login')
      .send({
        password: 'enzo@1920aSd!',
        email: 'enzo@gmail.com',
      })
      .expect(200, done());
  });
});
