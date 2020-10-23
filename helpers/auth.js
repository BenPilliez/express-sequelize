const jwt = require('jsonwebtoken');

module.exports = {
    verifToken: (req, res, next) => {
        console.debug('app => helper => verifToken');

        try {

            let token = req.headers.authorization.split(' ')[1];
            if (token.startsWith('Bearer ')) {
                token = token.slice(7, token.length);
            } else {
                return res.status(401).json({error: "JWT mal formé"});
            }
            const decodedToken = jwt.verify(token, process.env.SECRET);
            const userId = decodedToken.userId;

            //On vérifie dans le param en cas de route users
            if (req.baseUrl === "/api/users" && req.params.id && req.params.id !== userId) {
                return res.status(401).json("Seul le titulaire peut effectuer cette action");
            }
            //On vérifie dans le body en cas de posts ou autre
            if (req.body.userId && req.body.userId !== userId) {
                return res.status(401).json("Seul le titulaire peut effectuer cette action");
            } else {
                next();
            }
        } catch {
            res.status(401).json({
                error: "Tu dois être authentifié pour réaliser cette action"
            });
        }
    },
    checkRole: (req, res, next) => {
        console.debug('app => helper => checkRole');

        try {

            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET);

            const userRoles = decodedToken.userRoles;
            console.log(userRoles);

            if (!userRoles.includes("ROLE_ADMIN")) {
                res.status(401).json({
                    error: "Tu n'as pas l'autorisation nécessaire"
                })
            } else {
                next();
            }
        } catch (err) {
            return res.status(401).json({
                error: "Tu dois être authentifié pour accéder à cette ressource"
            })
        }
    }
};
