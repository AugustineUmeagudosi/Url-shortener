import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../../index';
import * as urlFixtures from '../fixtures/url';
import {Url} from "../../src/models";

const { expect } = chai;
chai.use(chaiHttp);

const baseUrl = '/api/v1/urls';

describe('Url Module', () => {

  before( async () => {
    await Url.deleteMany();
  });

  // encode
  it('should create a short url', (done) => {
    chai.request(app)
      .post(`${baseUrl}/encode`)
      .send(urlFixtures.longUrl)
      .end((err, res) => {
        const { message, status, data:{shortUrl} } = res.body;
        process.env.shortUrl = shortUrl;
        expect(status).to.equal('success');
        expect(message).to.equal('Url shortened successfully!');
        done();
      });
  });

  it('should fail when an invalid url formate is supplied', (done) => {
    chai.request(app)
      .post(`${baseUrl}/encode`)
      .send(urlFixtures.badLongUrl)
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal("Url should be in this format 'http://foo.bar' or 'https://foo.bar'");
        done();
      });
  });

  it('should fail when no long url is supplied', (done) => {
    chai.request(app)
      .post(`${baseUrl}/encode`)
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal("longUrl is required");
        done();
      });
  });

  it('should fail when the supplied long url has already been shortened', (done) => {
    chai.request(app)
      .post(`${baseUrl}/encode`)
      .send(urlFixtures.longUrl)
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal(`${urlFixtures.longUrl.longUrl} has already been shortened before`);
        done();
      });
  });

  // decode
  it('should fetch the details of a short url', (done) => {
    chai.request(app)
      .get(`${baseUrl}/decode?url_path=${process.env.shortUrl}`)
      .end((err, res) => {
        const { message, status, data } = res.body;
        expect(status).to.equal('success');
        expect(message).to.equal('Url decoded successfully!');
        expect(data).to.have.property('longUrl');
        done();
      });
  });

  it('should fail when url supplied is not found', (done) => {
    chai.request(app)
      .get(`${baseUrl}/decode?url_path=${process.env.shortUrl}w`)
      .end((err, res) => {
        const { message, status } = res.body;
        expect(status).to.equal('error');
        expect(message).to.equal("Url not found.");
        done();
      });
  });

});
