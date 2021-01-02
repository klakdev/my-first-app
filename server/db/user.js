const { Model, DataTypes } = require('sequelize');

class User extends Model {}

/**
 * 
 * @param {Sequelize} sequelize - instance of sequelize
 */
async function init(sequelize) {
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName :{
      allowNull: false,
      type: DataTypes.STRING,
    },
    profilePicture: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, { 
    sequelize, 
    modelName: "user",
    schema: "application",
    freezeTableName: true,
    timestamps: false
  });
  await User.sync();
  return User;
}

module.exports = {
  init,
  User
};

