const { Type } = require("../models/models")


class TypeController {

    async create(req, res, next) {
        try {
            const { name } = req.body
            if (!name) {
                return res.status(400).json({ message: "Введите название" })
            }
            const type = await Type.create({ name })
            return res.status(201).json(type)

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


    async getAll(req, res, next) {
        try {
            const types = await Type.findAll()
            return res.json(types)
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }

}

module.exports = new TypeController()