const models = require('../db/models');

module.exports = {

    posts_get: async (req, res) => {
        console.debug('Find all posts')

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
    }

}