// Import the required library
const sql = require('mssql');

// Create a database configuration
const config = {
    server: "PC025_MAINFLOOR\\MSSQLSERVER2022", // eg: 'DESKTOP_mjsi\\MSSQLEXPRESS'
    database: "LetsGetBraided",
    options: {
        trustedConnection: true,
    },
   
};
console.log('Attempting database connection...');
// Establish the connection
sql.connect(config, function(err) {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database');

    // Make a request
    const request = new sql.Request();

    // Construct the SQL insert query
    const query = `
        INSERT INTO Bookings (Name, Surname, Email, Date, Time, HairLength, BraidType, HairSize, Message)
        VALUES ('John', 'Doe', 'johndoe@example.com', '2024-04-20', '12:00', 'back', 'knotless braids', 'small', 'Test message')
    `;

    // Execute the SQL insert query
    request.query(query, function(err, result) {
        if (err) {
            console.error('Error executing insert query:', err);
            return;
        }

        console.log('Record inserted successfully');
    });
});
module.exports = { config };