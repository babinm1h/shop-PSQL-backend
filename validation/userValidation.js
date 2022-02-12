const { body } = require("express-validator");


const authValidation = [
    body("email", "Введите email").isEmail().withMessage("Неправильный email")
        .isLength({ min: 5, max: 35 }).withMessage("Допустимая длина email от 5 до 35 символов"),

    body("password", "Введите пароль").isString().isLength({ min: 4, max: 24 })
        .withMessage("Допустимая длина пароля от 4 до 24 символов")
]

module.exports = authValidation