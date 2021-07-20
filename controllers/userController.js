const userModel = require('../models/userModel')
const ObjectId = require("mongoose").Types.ObjectId
module.exports.getAllUser = async (req, res) => {
    console.log("all user")
    try {
        const users = await userModel.find().select("-password")
        return res.status(201).json(users )
    } catch (error) {
        return res.stats(200).json( error )
    }
}

module.exports.userInfo = async (req, res) => {
    console.log("user info")
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({ error: "id uknown" })

    try {
        const user = await userModel.findById(req.params.id);
        return res.status(200).json({ user })
    } catch (error) {
        res.status(400).json({ error })
    }
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({ error: "id uknown" })
    if (req.params.id !== res.locals.user._id.toString())
        return res.status(503).json({ error: "unauthorized" })
    try {
        await userModel.findByIdAndUpdate(
            { _id: res.locals.user._id },
            {
                $set: {
                    pseudo: req.body.pseudo,
                    email: req.body.email
                }
            },
            { new: true, upsert: true, setDefaultsOnInsert: true },
            (error, docs) => {
                if (!error) res.status(200).json(docs)
                else res.status(500).json(error)
            }
        )
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({ id: "id uknown" })
    try {
        await userModel.remove({ _id: res.locals.user._id }).exec()

        

        return res.status(200).redirect("/api/user/logout")
    } catch (error) {
        return res.status(400).json({ error })
    }
}