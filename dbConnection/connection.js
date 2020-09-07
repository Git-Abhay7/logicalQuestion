const Sequelize = require("sequelize");
const sequelize = new Sequelize("maindb", "root", "MySQL#root123", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize; 