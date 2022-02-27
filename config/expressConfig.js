import fs from 'fs';
import cors from 'cors';
import 'express-async-errors';
import morgan from 'morgan';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import errorHandler from './errorHandler';
import LoggerInit from './logger';
import routes from '../src/routes/index';

const logDirectory = './log';
if ( !fs.existsSync(logDirectory) ) fs.mkdirSync(logDirectory);

const expressConfig = (app) => { 
  const appPackage = app.get('APP_PACKAGE');

  const logger = LoggerInit.createLogger({
    label: appPackage.name
  });

  global.logger = logger;

  app.use(cors({ 
    exposedHeaders: ['Authorization'] 
  }));
  app.use(morgan('combined', { stream: logger.stream }));
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(helmet());
  app.disable('x-powered-by');

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.get('/', (req, res) => {
    return res.send({ message: 'Howdy!' });
  });

  routes(app);

  app.use((req, res) => res.status(404).json({
    status: 'Not Found',
    message: 'oooops! page not found',
  }));

  if (app.get('env') === 'development' || app.get('env') === 'test') {
    app.use((err, req, res) => res.status(err.status || 500).json(err));
  }

  app.use((err, req, res) => res.status(err.status || 500).send(err.error_message));

  app.use(errorHandler);
};

export default expressConfig;