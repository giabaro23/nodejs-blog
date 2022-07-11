const Course = require('../models/Course')
const {
    multipleMongooseToObject
} = require('../../util/mongoose')

class SiteController {
    //[GET] /
    home(req, res, next) {


        Course.find({}).then(courses => res.render('home', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(error => next(error))
        // res.render('home');
    }
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();