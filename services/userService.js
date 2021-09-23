const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const userService = {};

userService.getAll = function () { return userModel.getAll(); }

userService.create = async function (userDTO) {
    let hashedPassword = await bcrypt.hash(userDTO.password, 10);
    userDTO.password = hashedPassword;

    return await userModel.create(userDTO);
}

userService.login = async function (email, password) {
    user = await userModel.getOneByEmail(email);
    const login = await bcrypt.compare(password, user.password);
    if(login) {
        const userDTO = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
        return userDTO;
    }
    throw new Error('Unauthorized');
};


module.exports = userService;