const Course = require('../models/Course')
const {
    mongooseToObject
} = require('../../util/mongoose')

class CourseController {

    show(req, res, next) {
        Course.findOne({
                slug: req.params.slug
            })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                })
            }).catch(next);
    }

    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST]
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body)
        course.save().then(() => res.redirect('/me/stored/courses')).catch(error => {

        })
    }

    edit(req, res, next) {
        Course.findById(req.params.id).then(course => res.render('courses/edit', {
            course: mongooseToObject(course)
        })).catch(next)
    }

    // [put] /courses/:id
    update(req, res, next) {
        Course.updateOne({
            _id: req.params.id
        }, req.body).then(() => res.redirect('/me/stored/courses')).catch(next)
    }
    // [delete] /courses/:id
    delete(req, res, next) {
        Course.delete({
            _id: req.params.id
        }).then(() => res.redirect('back')).catch(next)
    }

    // [delete] /courses/:id/force

    forceDestroy(req,res,next){
        Course.deleteOne({
            _id: req.params.id
        }).then(() => res.redirect('back')).catch(next)
    }

    //[patch]  /courses/:id/restore
    restore(req,res,next){
        Course.restore({
            _id: req.params.id
        }).then(() => res.redirect('back')).catch(next)
    }

    //[post] /courses/handle-form-actions
    handleFormActions(req,res,next){
        switch (req.body.action) {
            case 'delete':
                Course.delete({
                    _id: {$in: req.body.courseIds}
                }).then(() => res.redirect('back')).catch(next)
                break;
        
            default:
                res.json({message: 'Action invalid!'});
        }
    }
}

module.exports = new CourseController();