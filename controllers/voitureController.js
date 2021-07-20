const voitureModel = require("../models/voitureModel")
const userModel = require("../models/userModel")
const ObjectId = require("mongoose").Types.ObjectId
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

module.exports.getAllVoiture = async (req, res, next) => {
    // if(!ObjectId.isValid(req.params.id))
    //     return res.status(401).json({error:"voiture non trouver"})
    console.log("all voiture")
    try {
        const voiture = await voitureModel.find();
        return res.status(201).json(voiture)
    } catch (error) {
        return res.status(401).json(error)
    }
}

module.exports.readVoiture = async (req, res) => {
    console.log("read one voiture")
    if (!ObjectId.isValid(req.params.id))
        return res.status(401).json({ error: "voiture non trouver" })
    try {
        const voiture = await voitureModel.findById(req.params.id)
        return res.status(201).json(voiture)
    } catch (error) {
        return res.status(401).json(error)
    }
}

module.exports.deleteVoiture = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(401).json({ error: "voiture non trouver" })
    const idVoiture = res.locals.user.voiture.includes(req.params.id.toString())
    if (!idVoiture) return res.status(501).send({ err: "unauthorized" })
    try {
        await userModel.findByIdAndUpdate(
            res.locals.user._id,
            {
                $pull: { voiture: req.params.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
            }
        );
        const voiture = await voitureModel.remove({ _id: req.params.id }).exec()
        return res.status(201).json({ message: "successfull deleted", voiture })
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports.updateVoiture = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(401).json({ error: "voiture non trouver" })
    const idVoiture = res.locals.user.voiture.includes(req.params.id.toString())
    if (!idVoiture) return res.status(501).send({ err: "unauthorized" })
    const voiture = {
        name: req.body.name,
        types: req.body.types,
        price: req.body.price
    }
    voitureModel.findByIdAndUpdate(
        req.params.id,
        { $set: voiture },
        { new: true },
        (err, docs) => {
            if (!err) return res.status(201).send(docs)
            else return res.status(501).send(err)
        }
    )
}

module.exports.createVoiture = async (req, res) => {

    let fileName;

    if (req.file !== null) {

        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            ) {
                throw Error("invalid file");
            }
            console.log("ok")

            if (req.file.size > 500000)
                throw Error("max size");

        } catch (err) {
            console.log(err)
            return res.status(201).json(err);
        }
        fileName = res.locals.user._id + Date.now() + ".jpg";

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );
    }

    const newVoiture = await new voitureModel({
        name: req.body.name,
        types: req.body.types,
        price: parseInt(req.body.price),
        picture: req.file !== null ? "/uploads/posts/" + fileName : "",
        userId: res.locals.user._id
    })
    console.log(newVoiture)
    try {
        userModel.findByIdAndUpdate(
            res.locals.user._id,
            {
                $addToSet: {
                    voiture: newVoiture._id
                }
            },
            (err, docs) => {
                console.log(err)
                if (err) return res.status(501).json(err)
            }
        )
        console.log("blem 2")
        const voiture = await newVoiture.save();
        return res.status(200).json(voiture)
    } catch (err) {
        console.log(err)
        return res.status(501).json(err)
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////
