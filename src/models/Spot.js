const mongoose = require('mongoose')
/* Criação do Schema */
const SpotSchema = new mongoose.Schema ({
    thumbnail: String,
    company: String,
    price: String,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    toJSON: {
        virtuals: true
    }
})
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://192.168.56.1:19000/files/${this.thumbnail}`
})
module.exports = mongoose.model('Spot', SpotSchema)
/* Exportando o model Spot */
