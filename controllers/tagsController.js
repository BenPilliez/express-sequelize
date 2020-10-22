const models = require('../db/models');
const {checkIfExist} = require('../helpers/dbHelper');

module.exports = {

    /**
     * Retourne la liste des tags
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    tags_get: async (req, res) => {
        console.debug("app => tagsController => tags_get")

        try {

            const limit = parseInt(req.query.perPage) || 10;
            const page = parseInt(req.query.page) || 0;
            const offset = limit * page;

            const tags = await models.Tags.findAndCountAll({
                limit: limit,
                offset: offset
            });

            if (tags.count === 0) {
                return res.status(404).json("Aucun tags n'a encore été crées")
            }

            return res.status(200).json(tags.rows);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },
    /**
     * Retourn le détail d'un tag avec ces posts
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    tags_detail: async (req, res) => {
        console.debug("app => tagsController => tags_detail()")
        try {

            const tag = await models.Tags.findByPk(req.params.id, {
                include: [
                    {
                        model: models.Post
                    }
                ]
            })

            if (!tag) {
                return res.status(404).json("Aucun tag avec cet identifiant");
            }

            return res.status(200).json(tag);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    /**
     * Crée un tag
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    tags_create: async (req, res) => {
        console.debug("app => tagsController => tags_create()")
        try {
            const tag = await models.Tags.create(req.body);
            return res.status(200).json(tag);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },
    /**
     * Met à jour un tag
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    tags_update: async (req, res) => {
        console.debug("app => tagsController => tags_update()")
        try {

            const tag = await checkIfExist('Tags', req.params.id);

            if (!tag) {
                return res.status(400).json("Ce tag n'existe pas");
            }

            tag.update(req.body);
            return res.status(200).json(tag);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    tags_delete: async (req, res) => {
        console.debug("app => tagsController => tags_delete()");
        try {

            const tag = await checkIfExist('Tags', req.params.id);

            if (!tag) {
                return res.status(404).json("Ce tag n'existe pas")
            }

            tag.destroy();
            return res.status(200).json("Tag supprimé");

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }

}