const Router = require('express')
const BasketController = require('../controllers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

const router = new Router()


router.post("/:id", authMiddleware, BasketController.create)
router.get("/", authMiddleware, BasketController.getAll)
router.delete("/:id", authMiddleware, BasketController.delete)


module.exports = router