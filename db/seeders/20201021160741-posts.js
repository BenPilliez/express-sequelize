module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Posts', [{
            title: 'Artcile 1',
            imageUrl: null,
            content: 'Ceci est le premier article',
            userId: 1,
            categoriesId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                title: 'Artcile 2',
                imageUrl: null,
                content: 'Ceci est le deuxième article',
                userId: 3,
                categoriesId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Article 3',
                imageUrl: null,
                content: "Tellement original que c'est le 3 article",
                userId: 2,
                categoriesId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                title: 'Article 4',
                imageUrl: null,
                content: "Tellement original que c'est le 4 article",
                userId: 1,
                categoriesId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            }], {});
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Projects', null, {});
    }
};