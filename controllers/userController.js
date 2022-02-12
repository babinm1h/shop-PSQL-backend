const { validationResult } = require("express-validator")
const { User, Basket } = require("../models/models")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id: id, email, role }, process.env.jwt_key, { expiresIn: "30d" }
    )
}

class UserController {

    async registration(req, res, next) {
        try {
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка валидации данных" })
            }

            let { email, password, role } = req.body
            const candidate = await User.findOne({ where: { email } })
            if (candidate) {
                return res.status(400).json({ message: "Такой email уже используется" })
            }
            const hashedPassword = await bcrypt.hash(password, 6)
            const user = await User.create({ email, password: hashedPassword, role })
            const basket = await Basket.create({ userId: user.id })
            const token = generateJwt(user.id, email, role)

            return res.json({ token })

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


    async login(req, res, next) {
        try {
            let errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка валидации данных" })
            }

            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" })
            }
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return res.status(400).json({ message: "Неправильный пароль" })
            }

            const token = generateJwt(user.id, email, password)
            return res.json({ token })

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


    async checkAuth(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({ token })
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


}

module.exports = new UserController()