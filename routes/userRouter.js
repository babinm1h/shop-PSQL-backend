const Router = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const authValidation = require("../validation/userValidation")


const router = new Router()


router.post("/registr", authValidation, userController.registration)
router.post("/login", authValidation, userController.login)
router.get("/auth", authMiddleware, userController.checkAuth)


module.exports = router