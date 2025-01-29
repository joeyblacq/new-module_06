const {
  contactValidator,
} = require("../shared/middleware/base-middleware.js");
const PublicController = require("../features/public/public.controller");

const registerPublicRoutes = (app) => {
  // Apply contactValidator middleware to the /contact route
  app.post("/contact", contactValidator, PublicController.contactUs);

  // Route for residential quote calculation
  app.get("/calc", PublicController.calculateResidentialQuote);
};

module.exports = { registerPublicRoutes };
