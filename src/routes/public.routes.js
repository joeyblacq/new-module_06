const PublicController = require('../features/public/public.controller');
const MiddleWare = require ("../shared/middleware/base-middleware")
const registerPublicRoutes = (app) => {
  app.post('/contact', PublicController.contactUs);

  app.get('/calc/:building_type',MiddleWare.buildingTypeMiddleWare,PublicController.calculateResidentialQuote);
}

module.exports = {registerPublicRoutes};