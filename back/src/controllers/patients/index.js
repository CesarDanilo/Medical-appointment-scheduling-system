const readPatients = require("./readPatientsController");
const createPatients = require("./createPatientsController");
const updatePatients = require("./updatePatientsController");
const deletePatients = require("./deletePatientsController");

module.exports = {
    readPatients,
    createPatients,
    updatePatients,
    deletePatients
}