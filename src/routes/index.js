import urlRoutes from './urlRouter';
import welcomeRoutes from './welcome';

const baseUrl = '/api/v1';
const routes = app => {
  app.use(`${baseUrl}`, welcomeRoutes);
  app.use(`${baseUrl}/urls`, urlRoutes);
};

export default routes;
