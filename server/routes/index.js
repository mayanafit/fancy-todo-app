const router = require(`express`).Router()
const todoRoutes = require(`./todoRoutes`)
const userRoutes = require(`./userRoutes`)
const {authentication} = require(`../middlewares/auth`)

router.get(`/`, (req,res) => {
    res.send(`Welcome to our TodoApp!`)
})
router.use(`/users`, userRoutes)
router.use(authentication)
router.use(`/todos`, todoRoutes)

module.exports = router 