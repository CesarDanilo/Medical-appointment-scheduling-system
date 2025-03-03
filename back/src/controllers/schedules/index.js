const readSchedules = require("./readSchedulesController");
const createSchedules = require("./createSchedulesController");
const updateSchedules = require("./updateDoctorsController");
const deleteSchedules = require("./deleteSchedulesController");

module.exports = {
    readSchedules,
    createSchedules,
    updateSchedules,
    deleteSchedules
}