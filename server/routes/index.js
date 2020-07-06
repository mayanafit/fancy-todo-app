const router = require(`express`).Router()
const todoRoutes = require(`./todoRoutes`)
const userRoutes = require(`./userRoutes`)

router.get(`/`, (req,res) => {
    res.send(`Welcome to our TodoApp!`)
})
router.use(`/users`, userRoutes)
router.use(`/todos`, todoRoutes)

module.exports = router