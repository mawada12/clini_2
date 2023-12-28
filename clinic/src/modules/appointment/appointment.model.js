var Sequelize = require("sequelize");
var DataTypes = Sequelize.DataTypes;
const { sequelize, connectDB } = require("../../../database/db/connection");

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    is_reserved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    patientId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "id"
      }
    }
  },
  { timestamps: true }
);

sequelize.sync().then(function () {
  // The sync() function returns a promise, so we use `.then()`
  console.log("APPOINTMENT model synchronized with database");
});

module.exports = Appointment;
