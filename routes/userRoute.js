const express = require('express');
const usersRoutes = express.Router();
const userService = require('../services/userService');

usersRoutes.route('/users').get( async function (req, res) {
    try {
        const users = await userService.getAll();
        return res.send(users);
    } catch(err) {
        console.error(err);
        res.status(500);
        return res.send({error: 'internal server error'});
    }
});

usersRoutes.route('/users/create').post( async function (req, res) {
    const {firstName, lastName, email, password} = req.body;
    if (!(firstName, lastName, email, password)){
        res.status(400).send('Missing input');
    }

    const userDTO = {
        firstName,
        lastName,
        email,
        password
    }

    try {
        existingUser = await userService.getOneByEmail(email);
        if (existingUser) {
            return res.status(422).send({error: 'Email taken'});
        }
        const user = await userService.create(userDTO);
        return res.send(user);
    } catch (err) {
        console.error(err);
        return res.status(500).send({error: 'Internal server error'});
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
        res.send(userDTO);
    } catch (err) {
        (err.message === 'Unauthorized') ? res.status(401) : res.status(500);
        if (res.status === 500) console.error(err);
        return res.send({error: 'internal server error'});
    }
});

usersRoutes.route('/users/forgot-password').post(function (req, res) {

});

usersRoutes.route('/users/confirm-email').post(function (req, res) {

});

module.exports = usersRoutes;