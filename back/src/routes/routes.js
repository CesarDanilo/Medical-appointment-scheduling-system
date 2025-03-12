const express = require("express");
const routes = express.Router();
const user_api = require("../api/users/user-api");
const doctors_api = require("../api/doctors/doctors-api");
const patients_api = require("../api/patients/patients-api");
const schedules_api = require("../api/schedules/schedules-api");
const remainders_api = require("../api/reminders/reminders-api");

routes.use('/user', user_api);
routes.use('/doctors', doctors_api);
routes.use('/patients', patients_api);
routes.use('/schedules', schedules_api);
routes.use('/appointments', appointments_api);
routes.use('/remainders', remainders_api);

module.exports = routes;