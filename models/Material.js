const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    count:{type:Number,required:true}
})

module.exports = model('Material', schema)