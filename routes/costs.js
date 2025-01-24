const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');
const Report = require('../models/Report');

// הוספת פריט עלות
router.post('/add', async (req, res) => {
    try {
        const { description, category, userid, sum, date } = req.body;

        // בדיקת שדות חובה
        if (!description || !category || !userid || !sum) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (sum <= 0) {
            return res.status(400).json({ error: 'Sum must be a positive number' });
        }


        // יצירת פריט עלות חדש
        const newCost = new Cost({
            description,
            category,
            userid,
            sum,
            date: date || Date.now() // שימוש בתאריך נוכחי אם לא נשלח תאריך
        });

        await newCost.save();
        res.json(newCost);
    } catch (err) {
        console.error('Error adding cost:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/report', async (req, res) => {
    try {
        const { id, year, month } = req.query;

        // בדיקת פרמטרים חסרים
        if (!id || !year || !month) {
            return res.status(400).json({ error: 'Missing parameters: id, year, month' });
        }

        // ווידוא ערכי year ו-month
        const parsedYear = parseInt(year, 10);
        const parsedMonth = parseInt(month, 10);
        if (isNaN(parsedYear) || isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
            return res.status(400).json({ error: 'Invalid year or month' });
        }

        console.log(`Fetching report for User ID: ${id}, Year: ${year}, Month: ${month}`);

        // בדיקת דוח קיים בקולקציית הדוחות
        const existingReport = await Report.findOne({ userid: id, year: parsedYear, month: parsedMonth });
        if (existingReport) {
            console.log('Returning existing report from the database');
            return res.json(existingReport.data);
        }

        // חישוב טווח התאריכים
        const startDate = new Date(parsedYear, parsedMonth - 1, 1);
        const endDate = new Date(parsedYear, parsedMonth, 0, 23, 59, 59, 999);

        console.log(`Start Date: ${startDate}, End Date: ${endDate}`);

        // חישוב הדוח באמצעות Aggregation Pipeline
        const reportData = await Cost.aggregate([
            {
                $match: {
                    userid: id,
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: '$category',
                    total: { $sum: '$sum' }, // סכום כל העלויות באותה קטגוריה
                    items: {
                        $push: { description: '$description', sum: '$sum', date: '$date' } // פרטים נוספים על כל פריט
                    }
                }
            }
        ]);

        console.log('Report Data from Costs:', reportData);

        // טיפול במקרה שאין תוצאות
        if (reportData.length === 0) {
            console.log('No data found for the specified user and date range');
            return res.status(404).json({ message: 'No data found for the specified user and date range' });
        }

        // שמירת הדוח בקולקציית הדוחות
        const newReport = new Report({
            userid: id,
            year: parsedYear,
            month: parsedMonth,
            data: reportData
        });

        await newReport.save();
        console.log('New report created and saved to the database');

        // החזרת הדוח החדש
        res.json(reportData);
    } catch (err) {
        console.error('Error fetching report:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;


