const models = require('../db/models');
const jwt = require('jsonwebtoken');

module.exports = {

    /**
     * Créé un utilisateur
     * @param req
     * @param res
     * @returns {Promise<any>}
     */
    signup: async (req, res) => {
        console.debug("app => authController => signup")

        try {

            const user = await models.User.create(req.body);
            return res.status(201).json({
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                roles: user.roles
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    login: async (req, res) => {
        console.debug("app => authController => login");

        try {

            let user = await models.User.findOne({
                where: {
                    email: req.body.email
                },
                attributes: ['firstname', 'lastname', 'id', 'email', 'roles', 'password']
            });

            if (!user) {
                console.debug("User incorrect")
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            let password = user.validatePassword(req.body.password, user.password);
            if (!password) {
                console.debug("Password incorrect")
                return res.status(401).json({error: "Utilisateur ou mot de passe incorrect"});
            }

            let token = jwt.sign(
                {
                    userId: user.id,
                    userRoles: user.roles,
                },
                process.env.SECRET,
                {
                    expiresIn: '24h',
                    audience: process.env.AUDIENCE,
                    issuer: process.env.ISSUER
                }
            )
            return res.status(200).json({
                user:
                    {
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        fullname: user.fullname,
                        initial: user.initial,
                        roles: user.roles
                    },
                token: token
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json(err);
        }
    },

    account: async (req, res) => {
        try {
            let user = await models.User.findByPk(req.user.userId, {
                include: [
                    {
                        model: models.Post
                    }
                ]
            })
            return res.json(user);
        } catch (err) {
            console.error(err)
            return res.status(500).json(err)
        }
    }
}
