const readAppointmentHistory = require("./readAppointmentHistoryController");
const createAppointmentHistory = require("./createAppointmentHistoryController");
const updateAppointmentHistory = require("./updateDoctorsController");
const deleteAppointmentHistory = require("./deleteAppointmentHistoryController");

module.exports = {
    readAppointmentHistory,
    createAppointmentHistory,
    updateAppointmentHistory,
    deleteAppointmentHistory
}