import jwt from 'jsonwebtoken'

export const signJwt = (payload, options = {}) => 
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || '1h', ...options });

export const verifyJwt = (token) => 
  jwt.verify(token, process.env.JWT_SECRET);