const mongoose = require('mongoose');
const {Schema} = mongoose;
const noteSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,     // acts as a foreign key
        ref : 'user'                          // name of collection which references to it
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : 'general'
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('notes',noteSchema);