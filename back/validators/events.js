const Joi = require('@hapi/joi')

module.exports.eventsCreationValidator = (data)=>{
    let schema = Joi.object({
        title: Joi.required().string().min(10).max(50),
        content: Joi.string().required().min(10).max(2000),
        author: Joi.string().required(),
        createdAt: Joi.Date().required(),
        eventDate: Joi.required().Date()
        // see how to manage arrays for updates, comments, images and mediapaths
    })
    return schema.validate(data)
}

module.exports.eventsUpdateValidator = (data)=>{
    let schema = Joi.object({
        
        // see how to manage arrays for updates, comments, images and mediapaths

        
    })
    return schema.validate(data)
}


