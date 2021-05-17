const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    userId:{type: Types.ObjectId, ref: 'Client' },
    date:{type:Date},
    doctorName:{type:String },
    complaints:{type:String }, //жалобы
    treatment:{type:String } //лечение
    
})

module.exports = model('Card', schema)