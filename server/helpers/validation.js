const Joi = require('joi');
//const scratchCard = require('../models').scratchCards
const userId = require('../models').users
module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
            //req.value.body needs to  be used in the controller instead of req.body
        }
    },
    schemas: {
        authSchema: Joi.object().keys({
            dateofTransaction: Joi.date().required(),
            uId: Joi.number().required(),
            scratchCardId: Joi.number().required()
        }),
        userSchema: Joi.object().keys(
            {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                isActive: Joi.number().required()
            }
        )

    }


}