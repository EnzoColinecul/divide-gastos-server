const request = require('supertest');

const req = request('http://127.0.0.1:6868');

describe('Auth Route', () => {
  describe('Test /login', () => {
    it('should return status code 200', (done) => {
      req
        .post('/api/auth/login')
        .send({
          password: 'enzo@1920aSd!',
          email: 'enzo@gmail.com',
        })
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should return status code 400 - invalid user', (done) => {
      req
        .post('/api/auth/login')
        .send({
          password: 'enzo@1920aSd!',
          email: 'enzo@error.com',
        })
        .expect('Content-Type', /json/)
        .expect(400, {
          ok: false,
          msg: 'Email or password is invalid',
        })
        .end(done);
    });

    it('should return status code 400 - invalid password', (done) => {
      req
        .post('/api/auth/login')
        .send({
          password: 'test1234',
          email: 'enzo@gmail.com',
        })
        .expect('Content-Type', /json/)
        .expect(400, {
          ok: false,
          msg: 'Email or password is invalid',
        })
        .end(done);
    });
  });

  describe('Test /register', () => {
    it('should return status code 200', (done) => {
      req
        .post('/api/auth/register')
        .send({
          firstName: 'test',
          lastName: 'test',
          email: 'enzo8@gmail.com',
          password: 'enzo@1920aSd!',
          passwordConfirm: 'enzo@1920aSd!',
        })
        .expect('Content-Type', /json/)
        .expect(201, done);
    });

    it('should return status code 400 - user already exists', (done) => {
      req
        .post('/api/auth/register')
        .send({
          password: 'enzo@1920aSd!',
          passwordConfirm: 'enzo@1920aSd!',
          email: 'enzo2@gmail.com',
          firstName: 'enzo',
          lastName: 'coli',
        })
        .expect('Content-Type', /json/)
        .expect(400, {
          ok: false,
          msg: 'User already exists with that email',
        })
        .end(done);
    });
  });

  describe('Test /renew', () => {
    it('should return status code 200 - Renew Token', (done) => {
      const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2M2NlYWNlMGQ5OTY2MThlOWZlMzJlZjQiLCJlbWFpbCI6ImVuem9AZ21haWwuY29tIiwiaWF0IjoxNjc2OTI4MjE5LCJleHAiOjE2NzY5MzU0MTl9.FMker2DNAxe0zhfoYlm5G_P52q3i6hR2OWyomk4bQC4';
      req
        .get('/api/auth/renew')
        .set({ Authorization: TOKEN })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(done);
    });
  });
});
