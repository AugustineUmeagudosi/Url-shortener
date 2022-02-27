import 'dotenv/config';
import devEnv from './env/development';
import testEnv from './env/test';
import prodEnv from './env/production';

const { NODE_ENV } = process.env;

export default {
  test: testEnv,
  production: prodEnv,
  development: devEnv,
}[NODE_ENV || 'development'];