import {getDb} from '../db/conn.js';

const userModel = {};

userModel.getAll = async function () {
    try {
        const users = await getDb()
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
        const user = await getDb()
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
        let user = {
            firstName: userDTO.firstName,
            lastName: userDTO.lastName,
            email: userDTO.email.toLowerCase(),
            password: userDTO.password
        };
        if (await this.getOneByEmail(userDTO.email) !== null) throw new Error('EntityTaken');
        const createdUserResponse = await getDb()
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
        const updatedUser = await getDb()
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

userModel.deleteById = async function(userId) {
    try {
        const deleteUser = await getDb()
            .collection('users')
            .deleteOne({_id: userId});
        return deleteUser;
    }catch (err) {
        console.error(err);
        throw new Error(err);
    }
}

export default userModel;