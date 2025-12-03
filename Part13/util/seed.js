// util/seed.js
const { sequelize } = require("./db");
const { User, Blog, ReadingList, Session } = require("../models");

const seedDatabase = async () => {
  try {
    // Drop all tables
    console.log("Dropping all tables...");
    await sequelize.drop();

    // Create sequelize_meta table first
    console.log("Creating sequelize_meta table...");
    await sequelize.getQueryInterface().createTable("sequelize_meta", {
      name: {
        type: sequelize.Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    });

    // Run migrations
    console.log("Running migrations...");
    const { Umzug } = require("umzug");
    const path = require("path");

    const migrator = new Umzug({
      migrations: {
        glob: path.join(__dirname, "../migrations/*.js"),
      },
      context: sequelize.getQueryInterface(),
      storage: {
        async logMigration({ name }) {
          await sequelize
            .getQueryInterface()
            .bulkInsert("sequelize_meta", [{ name }]);
        },
        async unlogMigration({ name }) {
          await sequelize
            .getQueryInterface()
            .bulkDelete("sequelize_meta", { name });
        },
        async executed() {
          const results = await sequelize
            .getQueryInterface()
            .select(null, "sequelize_meta");
          return results.map((r) => r.name);
        },
      },
      logger: console,
    });

    await migrator.up();
    console.log("Migrations completed");

    // Create users
    console.log("Creating users...");
    const users = await User.bulkCreate([
      {
        username: "joona@gmail.fi",
        name: "Joona Sandbacka",
      },
      {
        username: "testuser@example.com",
        name: "Test User",
      },
      {
        username: "admin@example.com",
        name: "Admin User",
        admin: true,
      },
    ]);
    console.log(`Created ${users.length} users`);

    // Create blogs
    console.log("Creating blogs...");
    const blogs = await Blog.bulkCreate([
      {
        title: "Clean React",
        author: "Dan Abramov",
        url: "https://google.com",
        likes: 34,
        year: 2020,
        userId: users[0].id,
      },
      {
        title: "Clean Code",
        author: "Bob Martin",
        url: "https://google.com",
        likes: 5,
        year: 2008,
        userId: users[0].id,
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andy Hunt",
        url: "https://example.com",
        likes: 100,
        year: 1999,
        userId: users[1].id,
      },
      {
        title: "Refactoring",
        author: "Martin Fowler",
        url: "https://example.com",
        likes: 67,
        year: 2018,
        userId: users[1].id,
      },
      {
        title: "Design Patterns",
        author: "Gang of Four",
        url: "https://example.com",
        likes: 89,
        year: 1994,
        userId: users[2].id,
      },
    ]);
    console.log(`Created ${blogs.length} blogs`);

    // Add blogs to reading lists
    console.log("Creating reading list entries...");
    const readingListEntries = await ReadingList.bulkCreate([
      {
        userId: users[0].id,
        blogId: blogs[2].id, // Matti reads "The Pragmatic Programmer"
        read: false,
      },
      {
        userId: users[0].id,
        blogId: blogs[3].id, // Matti reads "Refactoring"
        read: true,
      },
      {
        userId: users[1].id,
        blogId: blogs[0].id, // Test User reads "Clean React"
        read: false,
      },
      {
        userId: users[1].id,
        blogId: blogs[1].id, // Test User reads "Clean Code"
        read: false,
      },
      {
        userId: users[1].id,
        blogId: blogs[4].id, // Test User reads "Design Patterns"
        read: true,
      },
    ]);
    console.log(`Created ${readingListEntries.length} reading list entries`);

    console.log("\n✅ Database seeded successfully!");
    console.log("\nTest users:");
    console.log("1. mluukkai@iki.fi / password123");
    console.log("2. testuser@example.com / test123");
    console.log("3. admin@example.com / admin123 (admin)");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
