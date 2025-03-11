const readReminders = require("./readRemindersController");
const createReminders = require("./createRemindersController");
const updateReminders = require("./updateRemindersController");
const deleteReminders = require("./deleteRemindersController");

module.exports = {
    readReminders,
    createReminders,
    updateReminders,
    deleteReminders
}