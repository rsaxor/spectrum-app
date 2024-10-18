const express = require('express');
const Customer = require('../../models/Customers');
const router = express.Router();

// Create Customer (Registration)
router.post('/', async (req, res) => {
	const {
		acctcode,
		company,
		email,
		salesrep,
		trade
	} = req.body;
	const customer = new Customer({ acctcode, company, email, salesrep, trade });
	try {
		await customer.save();
		res.status(201).json(customer);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// GET /api/customers
router.get('/', async (req, res) => {
	try {
		const customers = await Customer.find();
		res.json(customers);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Fetch a customer by ID
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Customer
router.put('/:id', async (req, res) => {
	const { acctcode, company, email, salesrep, trade } = req.body;
	const customerUpdates = { acctcode, company, email, salesrep };

	if (trade) {
		customerUpdates.trade = trade;
	}

	try {
		const customer = await Customer.findByIdAndUpdate(req.params.id, customerUpdates, { new: true });
		res.json(customer);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Delete Customer
router.delete('/:id', async (req, res) => {
	try {
		await Customer.findByIdAndDelete(req.params.id);
		res.status(204).end();
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

module.exports = router;
