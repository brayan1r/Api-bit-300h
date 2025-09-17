import jwt from "jsonwebtoken"

export const signJwt = signJwt = (payload,opts ={} ) =>  jwt.sign (payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES||"1H",...opts}) ;

export const verifyJwt = (token) => jwt.verify(token, process.env.JWT_SECRET);//DECIFRAR