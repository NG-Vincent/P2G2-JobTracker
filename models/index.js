const User = require("./User");
const Calendar = require("./Calendar");

// User.hasOne(Calendar, {
//   foreignKey: "user_id",
// });

// Calendar.belongsTo(User, {
//   foreignKey: "user_id",
// });

module.exports = { User, Calendar };
