const models = require('../db/models');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    users_get: async (req, res) => {
        console.debug("app => usersController => users_get()")
        try {

            const limit = parseInt(req.query.perPage) || 10;
            const page = parseInt(req.query.page) || 0;
            const offset = limit * page;

            let users = await models.User.findAndCountAll({
                offset: offset,
                limit: limit
            });

            if (users.count > 0) {
                return res.json(users.rows);
            }

            return res.json('Aucun utilisateurs enregistrés');

        } catch (err) {
            console.error(err);
            return res.status(500).json(err.message);
        }
    },

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    users_detail: async (req, res) => {
        console.debug("app => usersController => users_detail()")
        try {
            const user = await models.User.findByPk(req.params.id, {
                include: [models.Post]
            });

            if (!user) {
                return res.status(400).json('Aucun utilisateur');
            }
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err.message);
        }
    },
    users_create: async (req, res) => {
        console.debug("app => usersController => users_create()")

        try {

            await models.User.create(req.body);
            return res.sendStatus(201);

        } catch (err) {
            console.error(err);
            return res.status(500).json(err.errors);
        }
    },

    users_update: async (req, res) => {
        console.debug("app => usersController => users_update()")

        try {

            let user = await models.User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json("Aucun utilisateur avec cet identifiant");
            }

            user.update(req.body);

            return res.status(200).json(user);

        } catch (err) {
            console.error(err);
            res.status(500).json(err.erros);
        }
    },
    users_delete: async (req, res) => {
        console.debug("app => usersController => users_delete()")

        try {

            let user = await models.User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json("Aucun utilisateur avec cet identifiant");
            }

            user.destroy();
            return res.status(200).json('Compte supprimé');
        } catch (err) {
            console.error(err);
            return res.status(500).json(err)
        }
    }

}
