const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize({dialect: 'sqlite', storage: './server/data.db', logging: false})

class Restaurant extends Model { }
class Menu extends Model { }
class Item extends Model { }

Restaurant.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING
}, { sequelize, modelName: 'restaurant' })

Menu.init({
    title: DataTypes.STRING,
}, { sequelize, modelName: 'menu' })

Item.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
}, { sequelize, modelName: 'item' })

Restaurant.hasMany(Menu, { as: 'menus' });
Menu.belongsTo(Restaurant);
Menu.hasMany(Item, { as: 'items' });
Item.belongsTo(Menu);

module.exports = { sequelize, Restaurant, Menu, Item }