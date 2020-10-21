module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [{
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@doe.com',
            password: 'Fifa2012',
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                firstName: 'John',
                lastName: 'Smith',
                email: 'john@smith.com',
                password: 'Fifa2012',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'John',
                lastName: 'Stone',
                email: 'john@stone.com',
                password: 'Fifa2012',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};