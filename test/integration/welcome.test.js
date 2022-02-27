import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';

import app from '../../index';

const { expect } = chai;
const baseUrl = '/api/v1';
chai.use(chaiHttp);

describe('Welcome', () => {
  it('Howdy!', done => {
    chai.request(app)
      .get('/')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { message } = res.body;
        expect(res.statusCode).to.equal(200);
        expect(message).to.equal('Howdy!');
        done();
      });
  });

  it('Hello World', done => {
    chai.request(app)
      .get(`${baseUrl}/`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { message } = res.body;
        expect(res.statusCode).to.equal(200);
        expect(message).to.equal('Hello World');
        done();
      });
  });

  it('Health check', done => {
    chai.request(app)
      .get(`${baseUrl}/healthCheck/ping`)
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        const { message } = res.body;
        expect(res.statusCode).to.equal(200);
        expect(message).to.equal('PONG');
        done();
      });
  });
});
