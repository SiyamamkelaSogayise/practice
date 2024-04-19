const sql = require('mssql');
const { config } = require('./database'); // Import database configuration

// Get database configuration


// Test connection
async function testConnection() {
  try {
    // Connect to the database
    await sql.connect(config);

    // Query the database (replace 'YourTableName' with the actual table name)
    const result = await sql.query`SELECT TOP 1 * FROM Bookings`;
    console.log('Attempting database connection...');

    // Log the result
    console.log('Connection successful. Retrieved data:', result);

    // Close the connection
    await sql.close();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

// Call the testConnection function
testConnection();
