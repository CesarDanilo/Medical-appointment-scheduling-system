const express = require("express");
const routes = express.Router();

const doctorsControllers = require('../../controllers/doctors');

routes.get('/', doctorsControllers.readDoctors);
routes.get('/:id', doctorsControllers.readDoctors);

routes.post('/create-doctors', doctorsControllers.createDoctors);

routes.put('/:id', doctorsControllers.updateDoctors);

routes.delete('/:id', doctorsControllers.deleteDoctors);

module.exports = routes;


