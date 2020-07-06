const {List} = require(`../models`)

class TodoController {
    static add(req, res) {
        let newList = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date)
        }

        List.create(newList) 
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            if (err.name === `SequelizeValidationError`) {
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

    static show(req, res) {
        List.findAll() 
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({message: `Internal Server Error. ${err}`})
        })
    }

    static find(req, res) {
        let id = +req.params.id
        List.findOne({where: {id}})
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: `Error not found.`})
            }
        })
        .catch(err => {
            res.status(500).json({message: `Internal Server Error. ${err}`})
        })
    }

    static update(req, res) {
        let updateList = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date)
        }
        let id = +req.params.id

        List.update(updateList, {where: {id}, returning: true})
        .then(data => {
            if (data[1].length > 0) {
                res.status(200).json(data[1][0])
            } else {
                res.status(404).json({message: `Error not found.`})
            }
        })
        .catch(err => {
            if (err.name === `SequelizeValidationError`) {
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

    static delete(req, res) {
        let deletedData;
        let id = +req.params.id
        List.findOne({where:{id}})
        .then(data => {
            if(!data) {
                res.status(404).json({message: `Error not found.`})
            }
            deletedData = data
            return List.destroy({where: {id}})
        })
        .then(data => {
            res.status(200).json(deletedData)
        })
        .catch(err => {
            res.status(500).json({message: `Internal Server Error. ${err}`})
        })
    }
}

module.exports = TodoController