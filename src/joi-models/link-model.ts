import { Joi } from 'celebrate';

// eslint-disable-next-line no-useless-escape
export const linkJoi = Joi.string().regex(/^(?!.*:0000)(?!.*\/\/\/)https?:\/\/(www.)?((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(\w{1,}(-\w+)*\.[a-z]{2,}))((.?[a-zA-Z0-9\/-])*(:[1-9]\d{1,4})?)#?$/);
