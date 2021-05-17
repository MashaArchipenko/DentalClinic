const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    idCard:{type: Types.ObjectId, ref: 'Card' },
    date:{type:Date,required:true},
    time:{type:String,required:true},
    idEstimate: {type: Types.ObjectId, ref: 'Estimate'},
    idStaff:{type: Types.ObjectId, ref: 'Staff'},
})

module.exports = model('Shedule', schema)