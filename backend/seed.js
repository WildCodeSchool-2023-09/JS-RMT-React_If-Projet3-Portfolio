/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Truncate tables (remove existing data)
    await database.query("truncate projets");
    await database.query("truncate technologies");
    await database.query("truncate experiences");
    await database.query("truncate competences");
    await database.query("truncate contacts");
    await database.query("truncate utilisateurs");

    /* ************************************************************************* */

    // Insert fake data into the 'projets' table
    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO projets (label, description, date_start, date_end, is_done) VALUES (?, ?, ?, ?, ?)",
          [
            faker.lorem.word(),
            faker.lorem.sentence(),
            faker.date.past(),
            faker.date.future(),
            faker.datatype.boolean(),
          ]
        )
      );
    }

    // Insert fake data into the 'technologies' table
    for (let i = 0; i < 5; i += 1) {
      queries.push(
        database.query("INSERT INTO technologies (label) VALUES (?)", [
          faker.lorem.word(),
        ])
      );
    }

    // Insert fake data into the 'experiences' table
    for (let i = 0; i < 8; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO experiences (label, description, company, date_start, date_end) VALUES (?, ?, ?, ?, ?)",
          [
            faker.lorem.word(),
            faker.lorem.sentence(),
            faker.company.name(),
            faker.date.past(),
            faker.date.future(),
          ]
        )
      );
    }

    // Insert fake data into the 'competences' table
    for (let i = 0; i < 6; i += 1) {
      queries.push(
        database.query("INSERT INTO competences (label) VALUES (?)", [
          faker.lorem.word(),
        ])
      );
    }

    // Insert fake data into the 'contacts' table
    for (let i = 0; i < 7; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO contacts (objet, message, date_reception) VALUES (?, ?, ?)",
          [faker.lorem.word(), faker.lorem.sentence(), faker.date.past()]
        )
      );
    }

    // Insert fake data into the 'utilisateurs' table
    for (let i = 0; i < 5; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?, ?)",
          [
            faker.person.lastName(),
            faker.person.firstName(),
            faker.internet.email(),
            faker.internet.password(),
            "admin",
          ]
        )
      );
    }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
