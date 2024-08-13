const Joi = require("joi")

module.exports.listingSchema = Joi.object({       // ye server side k form validation ke liye hai 
    title :Joi.string().required(),
        description :Joi.string().required(),
       
        price :Joi.number().required().min(0),
        location :Joi.string().required(),
        country :Joi.string().required(),
    }).required()


    module.exports.reviewSchema = Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required()
    }).required()

 
   

// module.exports.reviewSchema = Joi.object({
//     rating: Joi.number().required().min(1).max(5).messages({
//         'number.base': 'Rating must be a number',
//         'number.required': 'Rating is required',
//         'number.min': 'Rating must be at least 1',
//         'number.max': 'Rating cannot be more than 5'
//     }),
//     comment: Joi.string().required().messages({
//         'string.base': 'Comment must be a string',
//         'string.required': 'Comment is required'
//     })
// }).required();

