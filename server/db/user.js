const { Model, DataTypes } = require('sequelize');

class User extends Model {}

/**
 * @typedef {object} User
 * @property {string} id 
 * @property {string} firstName 
 * @property {string} lastName
 * @property {string} email
 * @property {string} profilePicture
 * @property {string} birthday
 * 
 */

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

  return {
    /**
     * 
     * @param {User} userData 
     */
    async create(userData) {
      const user = await User.create(userData);
      return user.toJSON();
    },
    /**
     * 
     * @param {string} id 
     */
    async delete(id) {
      const rowsDelete = await User.destroy({ 
        where: { id }
      })
      return rowsDelete === 1;
    },
    /**
     * 
     * @param {string} id 
     * @returns Promise<User>
     */
    async findById(id) {
      const user = await User.findOne({ where: { id } });
      return user;
    },
    /**
     * @param {User} userData
     * @param {string[]} fields
     */
    async update(userData, fields) {
      const [_result, users] = await db.user.update(userData, { 
        where: { id: userData.id }, 
        returning: true,
        fields
      });
      return users[0].toJSON();
    }
  };
}

module.exports = {
  init,
  User
};

