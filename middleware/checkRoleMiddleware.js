const jwt = require("jsonwebtoken")

module.exports = function (role) {
    return function (err, req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(401).json({ message: "Не авторизован" })
            }

            const decodedToken = jwt.verify(token, process.env.jwt_key)
            if (decodedToken.role !== role) {
                return res.status(403).json({ message: "Нет доступа" })
            }
            req.user = decodedToken
            next()

        } catch (err) {
            return res.status(401).json({ message: "Не авторизован" })
        }
    }
}