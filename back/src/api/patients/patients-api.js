const express = require("express");
const routes = express.Router();

const patientsControllers = require('../../controllers/patients');

routes.get('/', patientsControllers.readPatients);
routes.get('/:id', patientsControllers.readPatients);

routes.post('/create-patients', patientsControllers.createPatients);

routes.put('/:id', patientsControllers.updatePatients);

routes.delete('/:id', patientsControllers.deletePatients);

module.exports = routes;


