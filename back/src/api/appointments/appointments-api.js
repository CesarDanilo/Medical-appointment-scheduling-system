const express = require("express");
const routes = express.Router();

const appointmentsControllers = require('../../controllers/appointments');

routes.get('/', appointmentsControllers.readAppointments);
routes.get('/:id', appointmentsControllers.readAppointmentsnts);

routes.post('/create-appointments', appointmentsControllers.createAppointments);

routes.put('/:id', appointmentsControllers.updateAppointments);

routes.delete('/:id', appointmentsControllers.deleteAppointments);

module.exports = routes;



