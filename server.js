const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { connectToDatabase } = require('./database'); // Import the connectToDatabase function

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database configuration
const config = {
    server: "PC025_MAINFLOOR\\MSSQLSERVER2022",
    database: "LetsGetBraided",
    options: {
        trustedConnection: true,
    },
    driver: "msnodesqlv8",
};

// Handle form submission
app.post('/submit-form', (req, res) => {
    // Extract form data from request body
    const { name, surname, email, date, time, hair_length, braid_type, hair_size, message } = req.body;

    // Establish database connection
    sql.connect(config, function(err) {
        if (err) {
            console.error('Error connecting to the database:', err);
            res.status(500).send('Error connecting to the database');
            return;
        }

        // Create a new request object
        const request = new sql.Request();

        // Construct the SQL insert query
        const query = `
            INSERT INTO Bookings (Name, Surname, Email, Date, Time, HairLength, BraidType, HairSize, Message)
            VALUES (@name, @surname, @email, @date, @time, @hair_length, @braid_type, @hair_size, @message)
        `;

        // Set parameters for the SQL query
        request.input('name', sql.VarChar, name);
        request.input('surname', sql.VarChar, surname);
        request.input('email', sql.VarChar, email);
        request.input('date', sql.Date, date);
        request.input('time', sql.Time, time);
        request.input('hair_length', sql.VarChar, hair_length);
        request.input('braid_type', sql.VarChar, braid_type);
        request.input('hair_size', sql.VarChar, hair_size);
        request.input('message', sql.VarChar, message);

        // Execute the SQL insert query
        request.query(query, function(err, result) {
            if (err) {
                console.error('Error executing insert query:', err);
                res.status(500).send('Error inserting data into the database');
                return;
            }

            console.log('Record inserted successfully');
            res.status(200).send('Form submitted successfully');
        });
    });
});

// Start the server
const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
