const readPatients = require("./readPatientsController");
const createPatients = require("./createPatientsController");
const updatePatients = require("./updateDoctorsController");
const deletePatients = require("./deletePatientsController");

module.exports = {
    readPatients,
    createPatients,
    updatePatients,
    deletePatients
}