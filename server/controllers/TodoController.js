const {List} = require(`../models`)
const sendEmail = require(`../helpers/mailgun`)

class TodoController {
    static add(req, res, next) {
        let newList = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date),
            UserId: +req.userData.id
        }

        List.create(newList) 
        .then(data => {
            let subject = `Added New To-do list!`
            let text = `You've succesfully added new to do list with detail:\n\nTitle: ${data.title}\nDescription: ${data.description}\nDue Date:${data.due_date}\n\nGo complete your to-do list before the deadline!\n\nCheers,\nFancy To-do.`
            sendEmail(req.userData.email, subject, text)
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static show(req, res, next) {
        List.findAll({where: {UserId: +req.userData.id}, order: [[`createdAt`, `ASC`]]}) 
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static find(req, res, next) {
        let id = +req.params.id
        let errorMessage = {
            name: `ValidationError`,
            statusCode: 404,
            message: `Error, data not found.`
        }
        List.findOne({where: {id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                throw errorMessage
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static update(req, res, next) {
        let updateList = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date),
        }
        let id = +req.params.id
        let errorMessage = {
            name: `ValidationError`,
            statusCode: 404,
            message: `Error, data not found.`
        }

        List.update(updateList, {where: {id}, returning: true})
        .then(data => {
            if (data[1].length > 0) {
                res.status(200).json(data[1][0])
            } else {
                throw errorMessage
            }
        })
        .catch(err => {
            next(err)
        })

    }   

    static delete(req, res, next) {
        let deletedData;
        let id = +req.params.id
        let errorMessage = {
            name: `ValidationError`,
            statusCode: 404,
            message: `Error, data not found.`
        }

        List.findOne({where:{id}})
        .then(data => {
            if(!data) {
                throw errorMessage
            }
            deletedData = data
            return List.destroy({where: {id}})
        })
        .then(data => {
            res.status(200).json(deletedData)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController