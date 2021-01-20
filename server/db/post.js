const { Model, DataTypes } = require('sequelize');
const { User } = require('./user');

class Post extends Model {}

/**
 * @typedef {object} Post
 * @property {string} id 
 * @property {string} userId 
 * @property {string} text 
 * @property {string[]} pictures
 * @property {string} date
 * 
 */

/**
 * 
 * @param {Sequelize} sequelize - instance of sequelize
 * @param {User} user - instance of sequelize
 * @returns 
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
    pictures: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false,
      alter: true,
    }
  }, { 
    sequelize, 
    modelName: "post",
    schema: "application",
    freezeTableName: true,
    timestamps: false
  });
  user.hasMany(Post);
  Post.belongsTo(user);
  await Post.sync();

  return {
    /**
     * 
     * @param {Post} postData 
     */
    async create(postData) {
      const post = await Post.create(postData);
      return post;
    },
    /**
     * 
     * @param {string} id 
     */
    async delete(id) {
      await Post.destroy({ 
        where: { id }
      });
    },
    /**
     * 
     * @param {Post} post 
     */
    async update(post) {
      const [_result, posts] = await Post.update(post, { 
        where: { id: post.id }, 
        returning: true,
      });
      return posts[0].toJSON();
    },
    /**
     * 
     * @param {string} id 
     */
    async findById(id) {
      const post = await Post.findOne({ where: { id }, json: true });
      return post;
    },
    async findNext({ limit = 7, offset = 0 }) {
      const posts = await Post.findAll({ 
        include: "user",
        limit,
        offset
      });
      return posts.map(p => p.toJSON());
    }
  };
}

module.exports = {
  init,
  Post,
};
