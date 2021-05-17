const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    nameServise:{type: String},
    coust:{type:Number}
})

module.exports = model('PriceList', schema)