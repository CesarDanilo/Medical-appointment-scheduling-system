const express = require("express");
const routes = express.Router();
const user_api = require("../api/users/user-api");
const doctors_api = require("../api/doctors/doctors-api");

routes.use('/user', user_api);
routes.use('/doctors', doctors_api);
module.exports = routes;