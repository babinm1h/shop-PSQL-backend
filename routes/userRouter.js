const Router = require('express')
const userController = require('../controllers/userController')

const router = new Router()


router.post("/registr", userController.registration)
router.post("/login", userController.login)
router.get("/auth", userController.checkAuth)


module.exports = router