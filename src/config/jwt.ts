import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const JWT_EXPIRES_IN = '1d'; // 1 día, puedes cambiarlo

export const JwtAdapter = {
  sign: (payload: object) => jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }),
  verify: (token: string) => jwt.verify(token, JWT_SECRET),
};

