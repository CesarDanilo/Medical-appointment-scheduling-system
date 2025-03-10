const readAppointments = require("./readAppointmentsController");
const createAppointments = require("./createAppointmentsController");
const updateAppointments = require("./updateAppointmentsController");
const deleteAppointments = require("./deleteAppointmentsController");

module.exports = {
    readAppointments,
    createAppointments,
    updateAppointments,
    deleteAppointments
}