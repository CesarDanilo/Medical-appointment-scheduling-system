const express = require("express");
const routes = express.Router();
const user_api = require("../api/users/user-api");
const doctors_api = require("../api/doctors/doctors-api");
const patients_api = require("../api/patients/patients-api");
const schedules_api = require("../api/schedules/schedules-api");
const appointments_api = require("../api/appointments/appointments-api")
const reminders_api = require("../api/reminders/reminders-api");
const appointmentHistory_api = require("../api/appointmentHistory/appointmentHistory_api");

routes.use('/user', user_api);
routes.use('/doctors', doctors_api);
routes.use('/patients', patients_api);
routes.use('/schedules', schedules_api);
routes.use('/appointments', appointments_api);
routes.use('/reminders', reminders_api);
routes.use('/appointmentHistory', appointmentHistory_api);

module.exports = routes;