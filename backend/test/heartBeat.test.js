import request from 'supertest';

import app from '../src/app';

test('should respond with 200 - OK', (done) => {
  request(app)
    .get('/system/heartbeat')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, data) => {
      if (err) return done(err);
      expect(data.body.backendServerRunning).toBe(true);
      return done();
    });
});
