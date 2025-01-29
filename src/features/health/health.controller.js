const ResponseUtil = require('../../shared/utils/response-util').ResponseUtil;
require('dotenv').config();
const port = process.env.PORT || 3004;

const helloWorld = async(req, res) => {
  ResponseUtil.respondOk(res,null, 'Hello World')
  // res.send('Hello World!!');
};

const status = async(req,res) => {
  const envName = process.env.ENV_NAME;
  const message = `Environment '${envName}' running on port: ${port}`;
   ResponseUtil.respondOk(res, null, "Environment status good"); res.send(message);
};

const error = async(req,res) => {
  res.status(400);
   ResponseUtil.respondOk(res, null, "error");res.send('error');
};

module.exports = {helloWorld, status, error};