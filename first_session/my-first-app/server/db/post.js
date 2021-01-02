const { Model, DataTypes } = require('sequelize');
const { User } = require('./user');

class Post extends Model {}

/**
 * 
 * @param {Sequelize} sequelize - instance of sequelize
 * @param {User} user - instance of sequelize
 */
async function init(sequelize, user) {
  Post.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      references: {
        model: user,
        key: "id"
      },
      type: DataTypes.STRING,
    },
    text: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    date :{
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, { 
    sequelize, 
    modelName: "post",
    schema: "application",
    freezeTableName: true,
    timestamps: false
  });
  await Post.sync();
  return Post;
}

module.exports = {
  init,
  Post,
};