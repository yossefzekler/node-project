const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        minlength: 2,
        unique: true
    },
        
    name: {
        type: String,
        required: true,
        minlength: 2,
        
},
    description: {
        type: String,
        required: true,
        minlength: 2,
    },
    address: {
        type: String,
        required: true,
        minlength: 2,
    },
    tel: {
        type: Number,
        required: true,
        minlength: 2,
    },
    image: {
        type: String,
        required: true,
    },
                
    biznumber: {
        type: Number,
        required: true,
        minlength: 2,
    }

});
const Card = mongoose.model('cards', cardSchema);
module.exports = Card;