const { BasketDevice, Basket, Device } = require("../models/models")


class BasketController {

    async create(req, res, next) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const deviceId = req.params.id
            if (!deviceId) return res.status(404).send()

            const basket = await Basket.findOne({ where: { userId } })

            const inCart = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId: deviceId } })
            if (inCart) {
                return res.status(400).send()
            }

            await BasketDevice.create({ basketId: basket.id, deviceId })
            const basketDevice = await BasketDevice.findOne({
                where: { basketId: basket.id, deviceId },
                include: { model: Device }
            })
            return res.json(basketDevice)


        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


    async getAll(req, res, next) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const basket = await Basket.findOne({ where: { userId } })
            if (!basket) return res.status(404).send()

            const basketItems = await BasketDevice.findAll({
                where: { basketId: basket.id },
                include: {
                    model: Device
                }
            })

            return res.json(basketItems)

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


    async delete(req, res, next) {
        try {
            const userId = req.user.id
            if (!userId) return res.status(400).send()

            const deviceId = req.params.id
            if (!deviceId) return res.status(404).send()

            const basket = await Basket.findOne({ where: { userId } })
            if (!basket) return res.status(400).send()

            const candidate = await Device.findOne({ where: { id: deviceId } })
            if (!candidate) return res.status(404).send()
            await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } })
            return res.json(candidate)

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }

}

module.exports = new BasketController()