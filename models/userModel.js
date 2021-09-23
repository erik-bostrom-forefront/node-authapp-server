const dbo = require('../db/conn');

const userModel = {};

userModel.getAll = function () {
    // return all user objects
    try {
        return new Promise((resolve, reject) => {
            let db_connect = dbo.getDb('authApp');
            db_connect
            .collection('users')
            .find({})
            .toArray(function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });
    } catch(err) {
        console.error(err);
        throw new Error(err);
    }
    
}; 

userModel.getOneByEmail = async function (email) {
    try {
        let db_connect = dbo.getDb('authApp');
        const user = await db_connect
        .collection('users')
        .findOne({ email: email });
        return user;
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

userModel.create = async function (userDTO) {
    // create user
    try {
        let db_connect = dbo.getDb('authApp');
        let user = {
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            email: userDTO.email,
            password: userDTO.password,
        };
        if (await this.getOneByEmail(userDTO.email) !== null) throw new Error('EntityTaken');
        const createdUserResponse = await db_connect
        .collection('users')
        .insertOne(user);
        return createdUserResponse;
    }catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

module.exports = userModel;