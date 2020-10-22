'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            imageUrl: {
                type: Sequelize.STRING,
                allowNull: true
            },
            userId: {
                type: Sequelize.INTEGER,
                onDelete: "CASCADE",
                allowNull:false,
                references: {
                    model: 'Users',
                    key: 'id',
                    as: 'userId',
                }
            },
            categoriesId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                allowNull:false,
                references: {
                    model: 'Categories',
                    key: 'id',
                    as: 'categoriesId'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Posts');
    }
};