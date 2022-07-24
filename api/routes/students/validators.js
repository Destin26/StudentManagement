const Joi = require('joi');

const schemas = {
    addDetails: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        mobile: Joi.string().required(),
        gender: Joi.string().required(),
        email: Joi.string().email({ ignoreLength: true }),
        class: Joi.number(),
        guardianName: Joi.string().required(),
        guardianPhone: Joi.string().required()
    })
}

module.exports = {
    add: (req, res, next) => {
        let schema = schemas.addDetails;
        if (req !== undefined) {
            try {
                const check = schema.validate(req.body.studentObject, { abortEarly: false })
                if (check.error) {
                    let errors = []
                    check.error.details.forEach(element => {
                        errors.push(element.message)
                    })
                    res.json({
                        success: false,
                        errors
                    })
                }
                else {
                    next()
                }
            }
            catch (err) {
                res.json(err)
            }
        }
    }
}