const express = require("express");
const routes = express.Router();

const appointmentHistoryControllers = require('../../controllers/appointmentHistory');

routes.get('/', appointmentHistoryControllers.readAppointmentHistory);
routes.get('/:id', appointmentHistoryControllers.readAppointmentHistory);
routes.get('/doc_id/:doctor_id', appointmentHistoryControllers.readAppointmentHistory);

routes.post('/create-AppointmentHistory', appointmentHistoryControllers.createAppointmentHistory);

routes.put('/:id', appointmentHistoryControllers.updateAppointmentHistory);

routes.delete('/:id', appointmentHistoryControllers.deleteAppointmentHistory);

module.exports = routes;


