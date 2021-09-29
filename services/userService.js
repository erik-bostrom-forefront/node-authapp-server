import userModel from '../models/userModel.js';
import {createToken, hashPassword, comparePassword } from '../helpers/auth.js';
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
    let hashedPassword = await hashPassword(userDTO.password);
    userDTO.password = hashedPassword;
    const user = await userModel.create(userDTO);
    const token = createToken(user);

    const returnUser = {
        token
    }
    
    return returnUser;
}

userService.delete = async function (email) {
    const user = await userModel.getOneByEmail(email);
    const deleteUser = await userModel.deleteById(user._id);
    return deleteUser;
}


userService.login = async function (email, password) {
    const user = await userModel.getOneByEmail(email);
    const login = await comparePassword(password, user.password);
    if(login) {
        const token = createToken(user);
        const userDTO = {
            token
        }
        return userDTO;
    }
    throw new Error('Unauthorized');
};

export default userService;