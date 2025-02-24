const express = require("express");
const routes = express.Router();

const userControllers = require('../../controllers/users');

routes.get('/', userControllers.readUser);
routes.get('/name/:name', userControllers.readUser);
routes.get('/:id', userControllers.readUser);

routes.post('/create-user', userControllers.createUser);

routes.put('/:id', userControllers.updateUser);

routes.delete('/:id', userControllers.deleteUser);

module.exports = routes;


