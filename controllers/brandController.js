const { Brand } = require("../models/models")


class BrandController {

    async create(req, res, next) {
        try {
            const { name } = req.body
            if (!name) {
                return res.status(400).json({ message: "Введите название" })
            }
            const brand = await Brand.create({ name })
            return res.status(201).json(brand)

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll()
            return res.json(brands)
        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }

}

module.exports = new BrandController()