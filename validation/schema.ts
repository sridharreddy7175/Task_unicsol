import Joi from 'joi';

export const userRegistrationSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().trim().regex(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,20}$/).required(),
    password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?!.*\s).{8,}$/).required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().regex(/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,20}$/).required(),
    password: Joi.string().trim().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])(?!.*\s).{8,}$/).required(),
});

export const BookSchema=Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    description: Joi.string().required(),
})

