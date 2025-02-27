const express = require("express");
const routes = express.Router();
const user_api = require("../api/users/user-api");
const doctors_api = require("../api/doctors/doctors-api");
const patients_api = require("../api/patients/patients-api");

routes.use('/user', user_api);
routes.use('/doctors', doctors_api);
routes.use('/patients', patients_api);
module.exports = routes;