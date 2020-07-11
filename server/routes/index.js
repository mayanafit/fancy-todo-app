const router = require(`express`).Router()
const todoRoutes = require(`./todoRoutes`)
const userRoutes = require(`./userRoutes`)
const {authentication} = require(`../middlewares/auth`)
const QuotesController = require(`../controllers/QuotesController`)
const CalendarController = require(`../controllers/CalendarController`)

router.use(`/users`, userRoutes)
router.use(authentication)
router.use(`/todos`, todoRoutes)
router.get(`/quotes`, QuotesController.show)
router.get(`/calendar`, CalendarController.show)

module.exports = router 