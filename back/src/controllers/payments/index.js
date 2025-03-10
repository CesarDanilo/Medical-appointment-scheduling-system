const readPayments = require("./readPaymentsController");
const createPayments = require("./createPaymentsController");
const updatePayments = require("./updatePaymentsController");
const deletePayments = require("./deletePaymentsController");

module.exports = {
    readPayments,
    createPayments,
    updatePayments,
    deletePayments
}