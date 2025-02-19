const express = require("express");
const routes = express.Router();

const userControllers = require('../controllers/users');

routes.get('/', userControllers.getuser);
routes.get('/:name', userControllers.getuser);
routes.get('/:id', userControllers.getuser);

module.exports = routes;
