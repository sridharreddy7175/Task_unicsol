import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const BookSchema=Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string().alphanum().min(3).max(30).required(),
})

