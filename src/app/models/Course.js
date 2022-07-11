const mongoose = require("mongoose");
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Schema = mongoose.Schema

const Course = new Schema({
    name: {
        type: String,
        default: 'HTML',
        maxLength: 255,
        required: true,
    },
    description: {
        type: String,
        default: 'CSS',
        maxLength: 600,
    },
    image: {
        type: String,
        default: '',
        maxLength: 255,
    },

    slug: {
        type: String,
        slug: 'name',
        unique: true
    },
    videoId: {
        type: String,
        unique: true
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true
})

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})
module.exports = mongoose.model('Course', Course)