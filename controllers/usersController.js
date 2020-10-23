const models = require('../db/models');
const {checkIfExist} = require('../helpers/dbHelper');

module.exports = {

    /**
     * Retourne la list des users
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
            return res.status(500).json(err);
        }
    },

    /**
     * Retour le détails d'un users avec posts
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    users_detail: async (req, res) => {
        console.debug("app => usersController => users_detail()")
        try {
            const user = await models.User.findByPk(req.params.id, {
                include: [models.Post],
                attributes: ['firstname', 'lastname', 'id', 'roles']
            });

            if (!user) {
                return res.status(400).json('Aucun utilisateur');
            }
            return res.status(200).json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },
    /**
     * Met à jour un user s'il existe
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    users_update: async (req, res) => {
        console.debug("app => usersController => users_update()")

        try {

            let user = await checkIfExist('User', req.params.id);

            if (!user) {
                return res.status(404).json("Aucun utilisateur avec cet identifiant");
            }

            user.update(req.body);

            return res.status(200).json(user);

        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
    /**
     * Supprime un user s'il existe
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    users_delete: async (req, res) => {
        console.debug("app => usersController => users_delete()")

        try {

            let user = await checkIfExist('User', req.params.id);

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
