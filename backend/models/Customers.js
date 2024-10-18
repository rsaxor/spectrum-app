const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  acctcode: { type: String, required: true, unique: true },
  company: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  salesrep: { type: String, required: true },
  trade: { type: String, enum: ['Trade Customer', 'Cash Customer', 'Credit Customer'], default: 'Trade Customer' },
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;