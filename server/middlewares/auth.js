const {decode} = require(`../helpers/jwt`)
const {User, List} = require(`../models/index`)

const authentication =  async (req, res, next) => {
    const access_token = req.headers.access_token
    
    try {
        let userData = decode(access_token)
        req.userData = userData

        let user = await User.findByPk(userData.id)
        if (user) {
            next()
        }
    } catch(err) {
        next(err)
    }
}

const authorization = async (req, res, next) => {
    let UserId = +req.userData.id
    let id = +req.params.id
    let errorMessage = {
        name: `ValidationError`,
        statusCode: 403,
        message: `forbidden access!`
    }

    try {
        let todo = await List.findByPk(id)
        if (todo) {
            if (todo.UserId === UserId) {
                next()
            } else {
                throw errorMessage
            }
        } else {
            next()
        }
    } catch(err) {
        next(err)
    }
}

module.exports = {authentication, authorization}