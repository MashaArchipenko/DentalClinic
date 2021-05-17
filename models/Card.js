const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    userId:{type: Types.ObjectId, ref: 'Client' },
    date:{type:Date,required:true},
    doctorName:{type:String,required:true},
    complaints:{type:String,required:true}, //жалобы
    treatment:{type:String,required:true} //лечение
    
})

module.exports = model('Card', schema)