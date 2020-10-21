const models = require('../db/models');

module.exports = {

    /**
     *
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    users_get: async (req, res) => {
        console.debug('Find all users');
        try {
            let users = await models.User.findAll();

            if (users.length > 0) {
                return res.json(users);
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
        console.debug('Find user by Id')
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
    }

}
