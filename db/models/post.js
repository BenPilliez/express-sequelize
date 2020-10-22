'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: 'userId',
                onDelete: "CASCADE"
            })

            Post.belongsTo(models.Categories, {
                foreignKey: 'categoriesId',
                onDelete: "CASCADE"
            })
        }
    }

    Post.init({
        title: {
            type: DataTypes.STRING, allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Il me faut un titre"
                },
                notNull: {
                    msg: "il me faut un titre"
                }
            }
        },
        content: {
            type: DataTypes.TEXT, allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Il me faut un contenu"
                },
                notNull: {
                    msg: "il me faut un contenu"
                }
            }
        },
        imageUrl: {type: DataTypes.STRING, allowNull: true}
    }, {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};