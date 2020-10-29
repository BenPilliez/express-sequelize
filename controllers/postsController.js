const models = require('../db/models');
const {checkIfExist} = require('../helpers/dbHelper');
const {getPagingData} = require('../helpers/getPagingData');


module.exports = {
    /**
     * Retourne la list des posts
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    posts_get: async (req, res) => {
        console.debug("app => postsController => posts_get()")

        try {

            const limit = parseInt(req.query.perPage) || 10;
            const page = parseInt(req.query.page) || 0;
            const offset = limit * page;

            let posts = await models.Post.findAndCountAll(
                {
                    limit: limit,
                    offset: offset,
                    include: [
                        {
                            model: models.Categories
                        },
                        {
                            model: models.Tags
                        }
                    ],
                    distinct: true
                }
            );

            console.log(posts.count)
            const response = getPagingData(posts, page, limit);

            if (posts.count > 0) {
                return res.json(response)
            }

            return res.status(404).json('Aucun posts pour le moment');

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    /**
     * Détails d'un post
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    posts_details: async (req, res) => {
        console.debug("app => postsController => posts_detail()")

        try {

            const post = await models.Post.findByPk(req.params.id, {
                include: [
                    {
                        model: models.User,
                        attributes: ['firstname', 'lastname', 'initial', 'fullname', 'id']
                    },
                    {model: models.Tags}
                ]
            });

            if (!post) {
                return res.status(404).json('Aucun post avec cet identifiant');
            }

            return res.json(post);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    /**
     * Crée un post avec le user associé
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    posts_create: async (req, res) => {
        console.debug("app => postsController => posts_create()");
        try {
            const body = req.body;
            if (req.files.length > 0) {
                body['imageUrl'] = [];
                req.files.map((file) => {
                    body['imageUrl'].push(file.filename);
                })
                JSON.stringify(body['imageUrl']);
            }

            let post = await models.Post.create(body);

            return res.status(200).json(post);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    },

    /**
     * Met à jour un post
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    posts_update: async (req, res) => {
        console.debug("app => postsController => posts_update()");

        try {

            let post = await checkIfExist('Post', req.params.id);

            if (!post) {
                return res.status(404).json("Aucun post avec cet identifiant");
            }

            post.update(req.body);

            return res.status(200).json(post);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    /**
     * Supprime un post
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    posts_delete: async (req, res) => {
        console.debug("app => postsController => posts_delete()");

        try {

            let post = await checkIfExist('Post', req.params.id);

            if (!post) {
                return res.status(404).json("Aucun post avec cet identifiant");
            }

            post.destroy();

            return res.status(200).json("Post supprimé");

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    }

}
