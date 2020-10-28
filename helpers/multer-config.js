const multer = require('multer');
const {v4: uuid} = require('uuid');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req,file, callback) => {
        callback(null, 'images')
    },

    filename: async (req,file,callback) => {
        const uuid = await uuid();
        const extension = MIME_TYPES[file.mimetype];
        callback(null, `${uuid}.${extension}`)
    }
})

module.exports = multer({storage}).array('images');
