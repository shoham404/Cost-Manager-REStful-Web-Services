/**
  Mongoose model for costs.
 */

const mongoose = require('mongoose');

/**
 * Cost schema for storing user expenses.
   description: String - Description of the expense (required, max length: 255).
   category: String - Category of the expense (required).
   userid: String - User ID associated with the expense (required).
   sum: Number - Total amount of the expense (required, minimum: 0).
   date: Date - Date of the expense (default: current date).
 */

const costSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        maxlength: 255
    },
    category: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    sum: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cost', costSchema);

