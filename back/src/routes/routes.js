const express = require("express");
const routes = express.Router();
const user_api = require("../api/user-api");

routes.use('/user', user_api);

module.exports = routes;