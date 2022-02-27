import rootPath from 'app-root-path';
import development from './development';
import test from './test';
import production from './production';

const currentEnv = {
  development,
  test,
  production
}[process.env.NODE_ENV || 'development'];

export default {
  ...process.env,
  ...currentEnv,
  rootPath,
};