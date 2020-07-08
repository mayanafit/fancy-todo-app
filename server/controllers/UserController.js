const { User } = require(`../models`)
const {encode} = require('../helpers/jwt')
const {comparePassword} = require(`../helpers/bcrypt`)
const sendEmail = require(`../helpers/mailgun`)

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
}

module.exports = UserController