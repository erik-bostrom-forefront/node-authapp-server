const express = require('express');
const usersRoutes = express.Router();
const userService = require('../services/userService');

const responseCodes = {
    Unauthorized: 401,
    ServerError: 500,
    EntityTaken: 422,
    Ok: 200
}

usersRoutes.route('/users').get( async function (req, res) {
    try {
        const users = await userService.getAll();
        return res.send(users);
    } catch(err) {
        res.status(500);
        return res.send({error: 'internal server error'});
    }
});

usersRoutes.route('/users/create').post( async function (req, res) {
    const userDTO = req.body;
    try {
        const user = await userService.create(userDTO);
        return res.send(user);
    } catch (err) {
        let code = 500;
        let message = 'Internal server error';
        if (err.message === 'EntityTaken') {
            code = 422;
            message = 'Email taken';
        }
        res.status(code);
        return res.send({error: message});
    }
    
});

usersRoutes.route('/users/autenticate').post(function (req, res) {
    // const userDTO = req.body;
    // const user = await userService.authenticate(userDTO);

    // return res.json( {user} );
});

usersRoutes.route('/users/login').post( async function (req, res) {
    const {email, password} = req.body;
    try {
        const userDTO = await userService.login(email, password);
        res.send({userDTO});
    } catch (err) {
        (err.message === 'Unauthorized') ? res.status(401) : res.status(500);
        return res.send({error: 'internal server error'});
    }
});

usersRoutes.route('/users/forgot-password').post(function (req, res) {

});

usersRoutes.route('/users/confirm-email').post(function (req, res) {

});

module.exports = usersRoutes;