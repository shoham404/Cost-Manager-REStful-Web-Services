const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');
const Report = require('../models/Report');
const User = require('../models/User');

/**
 * Adds a new cost item for a user.
 * This route handles POST requests to add a new expense item to the database.
 *
 * @route POST /api/costs/add
 * @param {string} description - A brief description of the expense (e.g., "Groceries").
 * @param {string} category - The category of the expense (e.g., "Food", "Health").
 * @param {string} userid - The ID of the user making the expense.
 * @param {number} sum - The total amount of the expense (must be a positive number).
 * @param {string} [date] - The date of the expense. If not provided, the current date is used.
 * @returns {object} 201 - The newly created cost item.
 * @throws {Error} 400 - If required fields are missing or the sum is invalid.
 * @throws {Error} 404 - If the user does not exist.
 * @throws {Error} 500 - If there is a server error.
 */

router.post('/add', async (req, res) => {
    try {
        const { description, category, userid, sum, date } = req.body;

        const userExists = await User.findOne({ id: userid });
        if (!userExists) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Mandatory fields validation
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (sum <= 0) {
            return res.status(400).json({ error: 'Sum must be a positive number' });
        }


        // Creating a new cost item
        const newCost = new Cost({
            description,
            category,
            userid,
            sum,
            date: date || Date.now() // Use the current date if not provided
        });

        await newCost.save();
        res.json(newCost);
    } catch (err) {
        console.error('Error adding cost:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


/**
 * @route GET /report
 * @description Retrieves a monthly expense report for a specific user.
 * @param {Object} req - The request object.
 * @param {Object} req.query - Query parameters for the request.
 * @param {string} req.query.id - The ID of the user.
 * @param {string} req.query.year - The year for which to generate the report.
 * @param {string} req.query.month - The month for which to generate the report.
 * @param {Object} res - The response object.
 * @returns {Object} JSON response containing the report data.
 * @throws {Object} Returns a 400 error if parameters are missing or invalid.
 * @throws {Object} Returns a 404 error if no data is found for the specified user and date range.
 * @throws {Object} Returns a 500 error if an internal server error occurs.
 */
router.get('/report', async (req, res) => {
    try {
        const { id, year, month } = req.query;

        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing parameters: id, year, month' });
        }

        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10);
        if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
            return res.status(400).json({ error: 'Invalid year or month' });
        }

        console.log(`Fetching report for User ID: ${id}, Year: ${year}, Month: ${month}`);

        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);

        console.log(`Start Date: ${startDate}, End Date: ${endDate}`);

        // בדיקה אם כבר קיים דוח
        const existingReport = await Report.findOne({ userid: id, year: parsedYear, month: parsedMonth });

        // שליפת כל ההוצאות לחודש הנתון
        const costs = await Cost.find({ userid: id, date: { $gte: startDate, $lte: endDate } });

        if (!costs.length) {
            return res.status(404).json({ message: 'No data found for the specified user and date range' });
        }

        // רשימת קטגוריות קבועה מראש
        const allCategories = ['food', 'education', 'health', 'housing', 'sport'];

        // ארגון ההוצאות לפי קטגוריות
        const categorizedData = costs.reduce((acc, cost) => {
            if (!acc[cost.category]) {
                acc[cost.category] = [];
            }
            acc[cost.category].push({
                sum: cost.sum,
                description: cost.description,
                day: new Date(cost.date).getDate()
            });
            return acc;
        }, {});

        // יצירת הפלט כך שיכלול גם קטגוריות ריקות
        const reportData = allCategories.map(category => ({
            [category]: categorizedData[category] || []
        }));

        console.log('Generated Report Data:', reportData);

        // אם קיים דוח, נבדוק אם יש שינויים
        if (existingReport) {
            if (JSON.stringify(existingReport.data) === JSON.stringify(reportData)) {
                console.log('No changes detected, returning existing report.');
                return res.json({
                    userid: id,
                    year: parsedYear,
                    month: parsedMonth,
                    costs: existingReport.data
                });
            }

            console.log('Changes detected, updating report.');
            await Report.deleteOne({ _id: existingReport._id });
        }

        // יצירת ושמירת דוח חדש
        const newReport = await Report.create({
            userid: id,
            year: parsedYear,
            month: parsedMonth,
            data: reportData
        });

        console.log('New report saved.');
        res.json({
            userid: id,
            year: parsedYear,
            month: parsedMonth,
            costs: newReport.data
        });

    } catch (err) {
        console.error('Error fetching report:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;


