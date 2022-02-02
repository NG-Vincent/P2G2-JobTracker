const bcrypt = require("bcrypt");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {
   // check password when logging in
   checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
   }
}

User.init(
   {
      // ID number, primary key
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      // username
      username: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      // password
      password: {
         type: DataTypes.STRING,
         allowNull: false,
         // length requirement
         validate: {
            len: [4],
         },
      },
   },

   {
      hooks: {
         // hash password upon creation
         async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
         },
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: "user",
   }
);

module.exports = User;
