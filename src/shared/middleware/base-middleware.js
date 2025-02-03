require("dotenv").config();
const validator = require("validator");
const Express = require("express");
const app = Express();

const adminRoutes = ["/email-list", "/region-avg", "/calc-residential"];

const allowedRegions = ["north", "south", "east", "west"]; // Valid regions

const registerBaseMiddleWare = (app) => {
  app.use(Express.json());
  app.use(logger);
  app.use(checkAuthToken);
  // app.use(validateRegion); // Add the region validator middleware
};

// Logger middleware
const logger = (req, res, next) => {
  const message = `API call: ${req.method} on ${
    req.originalUrl
  } at ${new Date()}`;
  console.log(message);
  next();
};

// Auth token middleware
const checkAuthToken = (req, res, next) => {
  const url = req.url.slice(0, req.url.indexOf("?"));

  if (!adminRoutes.includes(url)) {
    next();
    return;
  }

  const inputToken = req.headers.token;
  const savedToken = process.env.TOKEN;

  if (inputToken !== savedToken) {
    res.status(401).send("Unauthorized");
    return;
  }

  next();
};

// Region validator middleware

const validateRegion = (req, res, next) => {

  const region = req.query.region; // Get the region from the query parameters

  if (!region) {
    res.status(400).send("Region is required");
    return;
  }
   const validregion = validator.isIn(region,allowedRegions)

  if (!validregion) {
    res
      .status(400)
      .send(
        `Invalid region: ${region}. Allowed regions are: ${allowedRegions.join(
          ", "
        )}`
      );
    return;
  }

  next();
};


// contact validator 

// Middleware for validating contact form input

const contactValidator = (req, res, next) => {
  
  const { email, phone } = req.body;

  // Ensure both email and phone are provided
  if (!email || !phone) {
    return res.status(400).send("Email and phone number are required");
  }

  // Validate email format
  const validEmail = validator.isEmail(email); // Correct validator method for email
  if (!validEmail) {
    return res.status(400).send("Invalid email format");
  }

  // Validate phone format (e.g., US phone numbers)
  const validPhone = validator.isMobilePhone(phone, "en-US"); // Correct validator method for phone
  if (!validPhone) {
    return res.status(400).send("Invalid phone number format");
  }

  // If all validations pass, proceed to the next middleware
  next();
};
module.exports = { registerBaseMiddleWare, validateRegion, contactValidator };
