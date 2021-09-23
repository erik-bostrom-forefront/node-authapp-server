const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = {};

userService.getAll = async function () {
    const users = await userModel.getAll();
    const usersDTO = [];
    for (let user of users) {
        usersDTO.push({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
    }
    return usersDTO;
}

userService.getOneByEmail = async function (email) {
    return await userModel.getOneByEmail(email);

}

userService.create = async function (userDTO) {
    let hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;
    const user = await userModel.create(userDTO);
    const token = jwt.sign(
        {user_id: user._id, email: user.email },
        process.env.TOKEN_KEY,
        {expiresIn: '2h'}
    );

    const returnUser = {
        firstName: userDTO.firstName,
        lastName: userDTO.lastName,
        email: userDTO.email,
        token: token
    }
    return returnUser;
}

userService.login = async function (email, password) {
    user = await userModel.getOneByEmail(email);
    const login = await bcrypt.compare(password, user.password);
    if(login) {
        const token = jwt.sign(
            {user_id: user._id, email: user.email},
            process.env.TOKEN_KEY,
            {expiresIn: '2h'}
        );
        const userDTO = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token
        }
        return userDTO;
    }
    throw new Error('Unauthorized');
};



module.exports = userService;