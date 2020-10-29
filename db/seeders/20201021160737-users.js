module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@doe.com',
                password: '$2b$12$3uwvQ8e2yQt79KfjUqKVAeihVgCS/0LZd5N3mapEPTYstugUhl4We',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'John',
                lastName: 'Smith',
                email: 'john@smith.com',
                password: '$2b$12$3uwvQ8e2yQt79KfjUqKVAeihVgCS/0LZd5N3mapEPTYstugUhl4We',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'John',
                lastName: 'Stone',
                email: 'john@stone.com',
                password: '$2b$12$3uwvQ8e2yQt79KfjUqKVAeihVgCS/0LZd5N3mapEPTYstugUhl4We',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
