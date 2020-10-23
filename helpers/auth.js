const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json("Seul le titulaire peut effectuer cette action");
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: "Vous n'êtes pas autorisé à faire ça"
        });
    }
};