const express = require("express");
const routes = express.Router();

const remindersControllers = require('../../controllers/reminders');

routes.get('/', remindersControllers.readReminders);
routes.get('/:id', remindersControllers.readReminders);

routes.post('/create-reminders', remindersControllers.createReminders);

routes.put('/:id', remindersControllers.updateReminders);

routes.delete('/:id', remindersControllers.deleteReminders);

module.exports = routes;



