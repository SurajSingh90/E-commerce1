'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prd extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Prd.belongsToMany(models.Cart,{through: 'CartProducts'})
      // Products.belongsToMany(models.Cart, {through: 'CartProducts'})
    }
  }
  Prd.init({
    name: DataTypes.TEXT,
    cost: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prd',
  });
  return Prd;
};