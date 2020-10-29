module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Posts', [{
            title: 'Artcile 1',
            imageUrl: null,
            content: ``,
            userId: 1,
            categoriesId: 4,
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            title: 'Artcile 17',
            imageUrl: null,
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis mauris quis mauris venenatis tincidunt. Donec rutrum varius molestie. Aliquam imperdiet turpis quis metus lacinia mattis. Nam a eleifend quam. Nulla efficitur rutrum lectus vel ultrices. Nulla rhoncus commodo mauris. Nulla aliquam diam vel risus fermentum, vel pretium enim dapibus.
            Morbi interdum
            nisl sit
            amet odio
            gravida,
            sit amet
            feugiat neque
            varius
            . Sed
            ac dui
            commodo justo
            euismod tristique.Donec
            enim enim,
            dapibus quis
            laoreet
            in,
            rhoncus sit
            amet sapien.Morbi
            eu purus
            quis augue
            dapibus fringilla
            eu rhoncus
            lectus
            . Suspendisse
            ultricies tortor
            eu congue
            varius
            . Morbi
            imperdiet nulla
            nunc,
            sed mattis
            nisi ullamcorper
            sit amet.Proin
            vel nulla
            mauris
            . Sed
            consectetur vehicula
            elit a
            sodales
            .

            Aenean sollicitudin
            lectus sed
            diam pretium
            molestie
            . Nulla
            feugiat,
            odio ac
            viverra tristique,
            libero ipsum
            sollicitudin magna,
            vel ultricies
            arcu ex
            non velit.Cras
            scelerisque tempor
            dictum
            . Maecenas
            auctor eu
            purus sed
            dapibus
            . Nam
            mollis elementum
            orci,
            quis porta
            sapien posuere
            vel
            . Quisque
            tempor nisl
            felis,
            ut faucibus
            erat suscipit
            ut
            . Donec
            semper ac
            elit
            in commodo.Fusce
            auctor vehicula
            odio,
            nec tincidunt
            velit convallis
            id
            . Nunc
            congue,
            elit vitae
            ultricies tristique,
            augue dui
            semper dui,
            sit amet
            vulputate diam
            orci eu
            ipsum
            . Mauris
            massa justo,
            placerat eu
            nisl eget,
            hendrerit eleifend
            est
            . Nullam
            placerat ante
            lacus,
            id semper
            orci mattis
            nec
            .

            Sed eget
            arcu at
            mi aliquet
            maximus a
            vel nulla.Phasellus
            eu enim
            hendrerit,
            venenatis nisi
            sit amet,
            viverra neque.Vestibulum
            purus felis,
            blandit id
            convallis at,
            suscipit eu
            nulla
            . Sed
            magna lacus,
            elementum eget
            facilisis et,
            dapibus quis
            ante
            . Maecenas
            tincidunt eu
            magna non
            eleifend
            . Quisque
            leo nunc,
            vehicula et
            justo eu,
            feugiat tincidunt
            odio
            . Fusce
            rhoncus diam
            a nisl
            ultricies pulvinar.Nunc
            faucibus posuere
            sapien
            .

            Vivamus scelerisque
            luctus risus,
            eu euismod
            dolor
            . Aenean
            sodales auctor
            mi a
            congue
            . Proin
            vel nunc
            neque
            . Aenean
            vel venenatis
            turpis,
            vel scelerisque
            diam
            . Proin
            vel augue
            non elit
            dictum bibendum
            vel vitae
            ex
            . Etiam
            sagittis efficitur
            turpis
            in malesuada.Donec
            blandit lacinia
            tincidunt
            .`,
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
        return queryInterface.bulkDelete('Posts', null, {});
    }
};
