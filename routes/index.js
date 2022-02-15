const Router = require('express')
const router = new Router()
const userRouter = require("./userRouter")
const deviceRouter = require("./deviceRouter")
const typeRouter = require("./typeRouter")
const brandRouter = require("./brandRouter")
const basketRouter = require("./basketRouter")


router.use("/user", userRouter)
router.use("/device", deviceRouter)
router.use("/brand", brandRouter)
router.use("/type", typeRouter)
router.use("/cart", basketRouter)


module.exports = router