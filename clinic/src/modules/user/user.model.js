var Sequelize = require("sequelize");
var DataTypes = Sequelize.DataTypes;
const { sequelize, connectDB } = require("../../../database/db/connection");
var bcrypt = require("bcrypt");

var User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("doctor", "patient"),
      allowNull: false
    }
  },
  { timestamps: true }
);

// Use bcrypt to hash the password before creating or updating
User.beforeCreate(function (user, options, callback) {
  var saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      return callback(err);
    }

    bcrypt.hash(user.password, salt, function (err, hashedPassword) {
      if (err) {
        return callback(err);
      }

      user.password = hashedPassword;
      callback(null, user);
    });
  });
});

User.beforeUpdate(function (user, options, callback) {
  // Check if the password has been changed before updating
  if (user.changed("password")) {
    bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS) || 10, function (err, salt) {
      if (err) {
        return callback(err);
      }

      bcrypt.hash(user.password, salt, function (err, hashedPassword) {
        if (err) {
          return callback(err);
        }

        user.password = hashedPassword;
        callback(null, user);
      });
    });
  } else {
    callback(null, user);
  }
});

sequelize.sync().then(function () {
  // The sync() function returns a promise, so we use `.then()`
  console.log("User model synchronized with database");
});

module.exports = User;
