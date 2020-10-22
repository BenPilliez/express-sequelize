module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@doe.com',
                password: '$2y$12$H4UZXK/nZ1sc1hffR/xP5eBiNCIZqaW8Yof.t8g2poo7LmgBlLA.y ',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'John',
                lastName: 'Smith',
                email: 'john@smith.com',
                password: '$2y$12$H4UZXK/nZ1sc1hffR/xP5eBiNCIZqaW8Yof.t8g2poo7LmgBlLA.y ',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: 'John',
                lastName: 'Stone',
                email: 'john@stone.com',
                password: '$2y$12$H4UZXK/nZ1sc1hffR/xP5eBiNCIZqaW8Yof.t8g2poo7LmgBlLA.y ',
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};