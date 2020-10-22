const models = require('../db/models');

module.exports = {

    /**
     *
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
                    offset: offset
                }
            );

            if (posts.count > 0) {
                return res.json(posts.rows)
            }

            return res.json('Aucun posts pour le moment');

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    posts_details: async (req, res) => {
        console.debug("app => postsController => posts_detail()")

        try {

            const post = await models.Post.findByPk(req.params.id, {
                include: [models.User]
            });

            if (!post) {
                return res.status(404).json('Aucun post avec cet identifiant');
            }

            return res.json(post);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err.errors);
        }
    },

    posts_update: async (req, res) => {
        console.debug("app => postsController => posts_update()");

        try {

            let post = await models.Post.findByPk(req.params.id);

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
     *
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    posts_delete: async (req, res) => {
        console.debug("app => postsController => posts_delete()");

        try {

            let post = await models.Post.findByPk(req.params.id);

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