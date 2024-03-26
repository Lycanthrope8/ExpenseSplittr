const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homeTaskModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    deadline: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    user_id: {
        type: String,
        required: true
    },
    home_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('HomeTask', homeTaskModel)