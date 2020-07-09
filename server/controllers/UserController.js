const { User } = require(`../models`)
const {encode} = require('../helpers/jwt')
const {comparePassword} = require(`../helpers/bcrypt`)
const sendEmail = require(`../helpers/mailgun`)
const {OAuth2Client} = require('google-auth-library');

class UserController {

    static register(req, res, next) {
        let newUser = User.dataForm(req.body)
        User.create(newUser)
        .then(data => {
            let subject = `Successfully Registered to Todo-Fancy!`
            let text = `Welcome ${data.email} to Todo-App! Go create your to-do list to help organizing your daily life!`
            sendEmail(data.email, subject, text)
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })

    }

    static login(req, res, next) {
        let user = User.dataForm(req.body)

        let errorMessage = {
            name: `ValidationError`,
            statusCode: 400,
            message: `Invalid Email or Password. Please check again.`
        }

        User.findOne({where:{email: user.email}})
        .then(data => {
            if (!data) {
                throw errorMessage
            } else {
                if (comparePassword(user, data)) {
                    const token = encode({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({access_token: token})
                } else {
                    throw errorMessage
                }
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static google(req, res, next) {
        const id_token = req.body.id_token
        const client = new OAuth2Client(process.env.CLIENTID);
        let payload;
        client.verifyIdToken({
            idToken: id_token,
            audience: process.env.CLIENTID  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then(ticket => {
            payload = ticket.getPayload();
            const userid = payload['sub'];
            return User.findOne({where: {email: payload.email}})
        })
        .then(data => {
            if (data) {
                return data
            } else {
                let dataUser = {
                    email: payload.email,
                    password: `1234`
                }
                return User.create(dataUser)
            }
        })
        .then(user => {
            const token = encode({
                id: user.id,
                email: user.email
            })
            return res.status(200).json({access_token: token})
        })
        .catch(err => {
            next(err)
        })

    }
}

module.exports = UserController