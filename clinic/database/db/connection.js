
// const dotenv = require("dotenv");
// dotenv.config({ path: "./../config/config" });
const { Sequelize } =require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

const connectDB = async () => {
  return await sequelize
    .sync({ alter: true })
    .then((Result) => {
      console.log(`DB Connected`);
    })
    .catch((err) => {
      console.log(`FAIL to connect DB ......${err}`);
    });
};
module.exports = {
  sequelize: sequelize,
  connectDB: connectDB,
};