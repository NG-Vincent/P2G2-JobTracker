// Import Model class and DataTypes object
const { Model, DataTypes } = require("sequelize");
// Create an instance of sequelize that holds database info
const sequelize = require("../config/connection");

// Create User Model
class Calendar extends Model {}

// Define Columns and configurations
Calendar.init(
   {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      title: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      start: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            notEmpty: true,
         },
      },
      description: {
         type: DataTypes.STRING,
      },
      status: {
         type: DataTypes.STRING,
         defaultValue: "new",
      },
      // user_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "user",
      //     key: "id",
      //   },
      // },
   },
   {
      sequelize,
      // Will create created_at and updated_at timestamps
      timestamps: true,
      // Will prevent sequelize from pluralising table name
      freezeTableName: true,
      // Will convert all camelCased columns to under_scored
      underscored: true,
      modelName: "calendar",
   }
);

module.exports = Calendar;
