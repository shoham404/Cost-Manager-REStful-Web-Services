/**
 * Express router for handling user-related routes.
 * This router provides endpoints to add a user and retrieve user details along with aggregated costs.
 *
 * @module userRouter
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cost = require('../models/Cost');

/**
 * Route to add a new user.
 * This route requires user details and validates them before saving.
 *
 * @route POST /api/users/add
 * @param {string} id - The unique user ID.
 * @param {string} first_name - The first name of the user.
 * @param {string} last_name - The last name of the user.
 * @param {Date} birthday - The date of birth of the user.
 * @param {string} marital_status - The marital status of the user.
 * @param {express.Request} req - The request object, expecting user details.
 * @param {express.Response} res - The response object used to send back data or errors.
 * @throws {400} If required fields are missing or user ID already exists.
 * @throws {500} If there is a server error.
 */

router.post('/add', async (req, res) => {
  try {
    const { id, first_name, last_name, birthday, marital_status } = req.body;

    // Mandatory fields validation
    if (!id || !first_name || !last_name || !birthday || !marital_status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Creating a new user
    const newUser = new User({
      id,
      first_name,
      last_name,
      birthday,
      marital_status
    });

    await newUser.save();
    res.json(newUser);
  } catch (err) {
    console.error('Error adding user:', err);
    if (err.code === 11000) {
      res.status(400).json({ error: 'User ID already exists' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

});

/**
 * Route to retrieve a user by ID along with their total cost.
 * This route retrieves user details and computes the total cost associated with the user.
 *
 * @route GET /api/id
 * @param {string} id - The unique user ID.
 * @param {string} first_name - The first name of the user.
 * @param {string} last_name - The last name of the user.
 * @param {number} age - The age of the user.
 * @param {number} total_cost - The total cost associated with the user.
 * @param {express.Request} req - The request object, expecting a user ID.
 * @param {express.Response} res - The response object used to send back data or errors.
 * @throws {404} If the user is not found.
 * @throws {500} If there is a server error.
 */

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Total cost calculation
    const totalCost = await Cost.aggregate([
      { $match: { userid: req.params.id } },
      { $group: { _id: null, total: { $sum: '$sum' } } }
    ]);

    res.json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age, // The age calculate by the schema
      total_cost: totalCost.length > 0 ? totalCost[0].total : 0
    });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;



