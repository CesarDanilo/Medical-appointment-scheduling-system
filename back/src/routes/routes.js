const express = require("express");
const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).send("Rota funcionando!")
})


module.exports = route;