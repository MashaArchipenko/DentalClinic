const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    userId:{type: Types.ObjectId, ref: 'User' },
    name:{type:String,required:true},
    adress:{type:String,required:true},
    phone:{type:String,required:true},
    byrthday:{type:Date,required:true}
})

module.exports = model('Client', schema)