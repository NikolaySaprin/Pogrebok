const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, User, Comment }) {
      // define association here
      this.belongsTo(
        Category,
        { foreignKey: 'category_id' },
      );
      this.belongsTo(
        User,
        { foreignKey: 'user_id' },
      );
      this.hasMany(
        Comment,
        { foreignKey: 'product_id' },
      );
    }
  }
  Product.init({
    name: DataTypes.STRING,
    text: DataTypes.TEXT,
    img: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
