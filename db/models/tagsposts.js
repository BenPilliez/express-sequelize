'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TagsPosts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    TagsPosts.init({
        postsId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model: 'Post', key: 'id'}
        },
        tagsId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {model: 'Tags', key: 'id'}
        }
    }, {
        sequelize,
        modelName: 'TagsPosts',
    });
    return TagsPosts;
};