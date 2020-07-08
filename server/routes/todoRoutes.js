const router = require(`express`).Router()
const TodoController = require(`../controllers/TodoController`)
const {authorization} = require(`../middlewares/auth`)

router.post(`/`, TodoController.add)
router.get(`/`, TodoController.show)
router.get(`/:id`, authorization, TodoController.find)
router.put(`/:id`, authorization, TodoController.update)
router.delete(`/:id`, authorization, TodoController.delete)
module.exports = router