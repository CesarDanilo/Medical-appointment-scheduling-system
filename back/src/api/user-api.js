const express = require("express");
const routes = express.Router();

const userControllers = require('../controllers/users/UsersControllers');

routes.get('/', userControllers);

module.exports = routes;
