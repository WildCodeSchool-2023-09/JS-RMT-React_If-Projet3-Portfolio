const fs = require("node:fs");
const path = require("node:path");

// Load environment variables from .env file from backend namespace
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, ".env");
dotenv.config({ path: envPath });

// Build the path to the schema SQL file
const schema = path.join(__dirname, "database", "schema.sql");

// Get database connection details from .env file
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
// Update the database schema
const mysql = require("mysql2/promise");

const migrate = async () => {
  try {
    // Read the SQL statements from the schema file
    const sql = fs.readFileSync(schema, "utf8");

    // Create a specific connection to the database
    const database = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      multipleStatements: true, // Allow multiple SQL statements
    });

    // Drop the existing database if it exists
    await database.query(`drop database if exists ${DB_NAME}`);

    // Create a new database with the specified name
    await database.query(`create database ${DB_NAME}`);

    // Switch to the newly created database
    await database.query(`use ${DB_NAME}`);

    // Execute the SQL statements to update the database schema
    await database.query(sql);

    // Close the database connection
    database.end();

    console.info(`${DB_NAME} updated from ${schema} 🆙`);
  } catch (err) {
    console.error("Error updating the database:", err.message);
  }
};

// Run the migration function
migrate();
