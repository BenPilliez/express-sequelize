'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Categories.hasMany(models.Post, {
                foreignKey: 'categoriesId'
            })
        }
    }

    Categories.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Un catégorie existe déjà avec ce nom"
            },
            validate: {
                notNull: {
                    msg: "Il faut lui donner un nom"
                },
                notEmpty: {
                    msg: "Il faut lui donner un nom"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Categories',
    });
    return Categories;
};