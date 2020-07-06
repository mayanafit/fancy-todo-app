const { User } = require(`../models`)
const bcrypt = require(`bcrypt`)
const jwt = require('jsonwebtoken')

class UserController {

    static register(req, res) {
        let newUser = User.dataForm(req.body)

        User.create(newUser)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if (err.name === `SequelizeValidationError` || err.name === `SequelizeDatabaseError`) {
                let errors = []
                err.errors.forEach(error => {
                    errors.push(error.message)
                });
                res.status(400).json(errors)
            } else {
                res.status(500).json({message: `Internal Server Error. ${err}`})
            }
        })

    }

    static login(req, res) {
        let user = User.dataForm(req.body)

        User.findOne({where:{email: user.email}})
        .then(data => {
            if (!data) {
                res.status(400).json({message: `Invalid Email or Password!`})
            } else {
                if (bcrypt.compareSync(user.password, data.password)) {
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email
                    }, process.env.SECRET)
                    res.status(200).json({access_token: token})
                } else {
                    res.status(400).json({message: `Invalid Email or Password!`})
                }
            }
        })
        .catch(err => {
            res.status(500).json({message: `Internal Server Error. ${err}`})
        })
    }
}

module.exports = UserController