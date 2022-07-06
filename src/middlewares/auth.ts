/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/index';
import {Request, Response, NextFunction} from 'express';


const extractBearerToken = (header) => header.replace('Bearer ', '');

export default (req:Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = extractBearerToken(authorization);
  let payload;
  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    payload = jwt.verify(token,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload;

  return next();
};
