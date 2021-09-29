import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const config = process.env;

const hashPassword = async (plainPassword) => {return await bcrypt.hash(plainPassword, 10)}
const comparePassword = async (plainPassword, hashedPassword) => {return await bcrypt.compare(plainPassword, hashedPassword)}
const verifyToken = (token) => { return jwt.verify(token, config.TOKEN_KEY) }

const createToken = (userObject) => {
    const {userId, firstName, lastName, email} = userObject;
    return jwt.sign(
        {
            userId,
            firstName,
            lastName,
            email
        },
        config.TOKEN_KEY,
        {expiresIn: '2h'}
    );
}

export {hashPassword, comparePassword, createToken, verifyToken}