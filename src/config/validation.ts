import * as joi from 'joi';

export const validationSchema =  joi.object({
    HOST_DB: joi.string(),
    PORT_DB: joi.number(),
    PASSWORD_DB: joi.string(),
    USERNAME_DB: joi.string(),
    NAME_DB: joi.string(),
    SECRET_KEY_JWT: joi.string(),
    CLIENT_ID_GOOGLE: joi.string()
});