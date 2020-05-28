const multer = require('multer') //dependencia que usa formato multipart form para upload de imagens ou arquivos
const path = require('path')
module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..','..', 'uploads'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const name = path.basename(file.originalname, ext)
            
            cb(null, `${name}-${Date.now()}${ext}`)
        }
    })

}