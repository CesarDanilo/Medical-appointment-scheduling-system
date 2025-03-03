const express = require("express");
const routes = express.Router();

const schedulesControllers = require('../../controllers/schedules');

routes.get('/', schedulesControllers.readSchedules);
routes.get('/:id', schedulesControllers.readSchedules);
routes.get('/doc_id/:doctor_id', schedulesControllers.readSchedules);

routes.post('/create-schedules', schedulesControllers.createSchedules);

routes.put('/:id', schedulesControllers.updateSchedules);

routes.delete('/:id', schedulesControllers.deleteSchedules);

module.exports = routes;


