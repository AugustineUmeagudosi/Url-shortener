import express from 'express';
import appPackage from './package.json';
import expressConfig from './config/expressConfig'; 
import 'dotenv/config';
import './config/db_connection';

const port = process.env.PORT;
const app = express();

app.set('APP_PACKAGE', {
  name: appPackage.name,
  version: appPackage.version,
});

if (!process.env.JWT_SECRET) { console.error('FATAL ERROR: jwtPrivateKey is not defined.'); process.exit(1); }

expressConfig(app);

app.listen(port, () => logger.info(`App listening on port ${port}...`));

export default app;