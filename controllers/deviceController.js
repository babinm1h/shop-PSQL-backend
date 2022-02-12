const path = require("path")
const uuid = require("uuid")
const { Device, DeviceInfo } = require("../models/models")

class DeviceController {

    async create(req, res, next) {
        try {
            const { name, price, typeId, brandId, info } = req.body
            const candidate = await Device.findAll({ where: { name } })
            if (candidate) {
                return res.status(400).json({ message: "Устройство с таким названием уже существует" })
            }
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, "..", "static", fileName))
            const device = await Device.create({ name, price, typeId, brandId, img: fileName })

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => DeviceInfo.create({
                    title: i.title,
                    description: i.description,
                    deviceId: device.id
                }))
            }

            return res.status(201).json(device)

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }


    async getAll(req, res, next) {
        try {
            let { brandId, typeId, limit, page } = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            let devices;

            if (brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
            }
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({ limit, offset })
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
            }

            return res.json(devices)

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }



    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const device = await Device.findOne({
                where: { id },
                include: [{ model: DeviceInfo, as: "info" }]
            })

            return res.json(device)

        } catch (err) {
            return res.status(500).json({ message: err })
        }
    }

}

module.exports = new DeviceController()