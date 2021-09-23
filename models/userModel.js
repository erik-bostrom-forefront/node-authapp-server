const dbo = require('../db/conn');

const userModel = {};

userModel.getAll = async function () {
    try {
        let db_connect = dbo.getDb('authApp');
        const users = await db_connect
            .collection('users')
            .find({})
            .toArray();
        return users;
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
    try {
        let db_connect = dbo.getDb('authApp');
        let user = {
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            email: userDTO.email.toLowerCase(),
            password: userDTO.password
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

userModel.updateById = async function(userFields, userId) {
    try {
        let db_connect = dbo.getDb('authApp');
        const updatedUser = await db_connect
            .collection('users')
            .updateOne(
                {_id: userId}, //filter
                {$set: userFields}
            );
        return updatedUser;
    }catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

module.exports = userModel;