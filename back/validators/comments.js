const Joi = require('@hapi/joi')

module.exports.commentsValidator = (data)=>{
    let schema = Joi.object({
        content: Joi.string().required().min(1).max(200),
        author: Joi.string().required(),
        //createdAt: Joi.date().required(),
        likes: Joi.number()
    })

    return schema.validate(data)
}
