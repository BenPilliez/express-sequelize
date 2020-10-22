const models = require('../db/models');


module.exports = {

    /**
     * Vérifie si une ressource existe
     * @param model
     * @param id
     * @returns {Promise<Model<any, TModelAttributes>>}
     */
    checkIfExist : async (model, id) => {

        return  await models[model].findByPk(id);

    }

}