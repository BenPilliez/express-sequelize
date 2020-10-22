'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Tags extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Tags.belongsToMany(models.Post, {
                through: 'TagsPosts',
                onDelete: "CASCADE",
                foreignKey: "tagsId"
            })
        }
    }

    Tags.init({
        name: {
            type: DataTypes.STRING, allowNull: false,
            unique:
                {
                    msg: 'Un tag existe déjà avec ce nom'
                },
            validate: {
                notEmpty: {
                    msg: "Il nous faut un nom pour ce tag"
                },
                notNull: {
                    msg: "Il nous faut un nom pour ce tag"
                }
            }
        }
    }, {
        sequelize,
        modelName: 'Tags',
    });
    return Tags;
};