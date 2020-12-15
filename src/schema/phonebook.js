const Joi = require("@hapi/joi");

exports.phoneBookValidation = Joi.object({
  name: Joi.string().required(),

  phone_numbers: Joi.array().items(
    Joi.object({
      tag: Joi.string().required().valid('mobile'),
      number: Joi.string().required()
    }).required(),
    Joi.object({
        tag: Joi.string().required().valid('home'),
        number: Joi.string().required()
    }),
    Joi.object({
        tag: Joi.string().required().valid('work'),
        number: Joi.string().required()
    }),
    Joi.object({
        tag: Joi.string().required().valid('other'),
        number: Joi.string().required()
    })
  ).required(),

  mailing_address: Joi.string().required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

exports.phoneBookEditValidation = Joi.object({
  name: Joi.string().optional(),

  phone_numbers: Joi.array().items(
    Joi.object({
      tag: Joi.string().required().valid('mobile'),
      number: Joi.string().required()
    }).optional(),
    Joi.object({
        tag: Joi.string().required().valid('home'),
        number: Joi.string().required()
    }).optional(),
    Joi.object({
        tag: Joi.string().required().valid('work'),
        number: Joi.string().required()
    }).optional(),
    Joi.object({
        tag: Joi.string().required().valid('other'),
        number: Joi.string().required()
    }).optional()
  ).optional(),

  mailing_address: Joi.string().optional(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
});
