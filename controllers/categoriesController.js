const models = require('../db/models');

module.exports = {

    /**
     * Retourne la liste des catégories avec pagination
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    categories_get: async (req, res) => {
        console.debug("app => categoriesController => categories_get()")
        try {

            const limit = parseInt(req.query.perPage) || 10;
            const page = parseInt(req.query.page) || 0;
            const offset = limit * page;

            const categories = await models.Categories.findAndCountAll({
                limit: limit,
                offset: offset
            });

            if (categories.count === 0) {
                return res.status(200).json("Il n'y a pas de catégorie")
            }

            return res.status(200).json(categories.rows)

        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },

    /**
     * Détails d'une catégorie avec 3 de ces posts
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    categories_details: async (req, res) => {
        console.debug("app => categoriesController => categories_detail()")
        try {

            let category = await models.Categories.findByPk(req.params.id,
                {
                    include: [
                        {
                            model: models.Post,
                            limit: 3,
                            offset: 0
                        }
                    ]
                });

            if (!category) {
                return res.status(404).json("Aucune catégorie avec cet identifiant");
            }

            return res.status(200).json(category);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },
    categories_create: async (req, res) => {
        console.debug("app => categoriesController => categories_create");

        try {

            const category = await models.Categories.create(req.body);
            console.log(bite);
            return res.status(200).json(category);

        } catch (err) {
            return res.status(500).json(err);
        }
    },

    /**
     * Met à jour une catégorie
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    categories_update: async (req, res) => {
        console.debug("app => categoriesController => categories_update()");
        try {

            const category = await models.Categories.findByPk(req.params.id);

            if (!category) {
                return res.status(400).json("Aucune catégorie avec cet identifiant");
            }

            category.update(req.body);
            return res.status(200).json(category);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },

    /**
     * Supprime une catégorie ainsi que les posts associés
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    categories_delete: async (req, res) => {
        console.debug("app => categoriesController => categories_delete()");

        try {

            let category = await models.Categories.findByPk(req.params.id);

            if (!category) {
                return res.status(404).json("Aucune catégorie avec cet identifiant");
            }

            category.destroy();
            return res.status(200).json("Catégorie supprimée");

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }

}