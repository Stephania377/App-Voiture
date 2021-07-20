const voitureModel = require("../models/voitureModel")
const userModel = require("../models/userModel")
const ObjectId = require("mongoose").Types.ObjectId

module.exports.createComment = async (req, res) => {
    console.log(req.params.id)
    if (!ObjectId.isValid(req.params.id))
        return res.status(401).json({ error: "Voiture inexistante" })
    try {
        const id = ObjectId()
        voitureModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: {
                    comments: {
                        _id: id,
                        commentUserId: res.locals.user._id,
                        text: req.body.text,
                        timestamps: new Date().getTime()
                    }
                }
            },
            (err, docs) => {
                if (err) return res.status(501).json(err)
            }
        ),
            userModel.findByIdAndUpdate(
                res.locals.user._id,
                {
                    $addToSet: {
                        comments: {
                            postId: req.params.id,
                            commentId: id
                        }
                    }
                },
                (err, docs) => {
                    if (!err) return res.status(201).json(docs)
                    else return res.status(501).json(err)
                }
            )

    } catch (error) {
        console.log(error)
    }
}

module.exports.editComment = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(401).json({ error: "Voiture inexistante" })
    try {
        return voitureModel.findById(
            req.params.id,
            (err, docs) => {
                const theComments = docs.comments.find(comment =>
                    comment._id.equals(req.body.commentId)
                )
                
                if (!theComments)
                    return res.status(403).send({err : "Aucun commentaire disponible"})

                theComments.text = req.body.text;

                return docs.save((err) => {
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).json({ err })
                })
            }
        )
    } catch (error) {
        return res.status(501).json(error)
    }
}

module.exports.deleteComment = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(401).json({ error: "Voiture inexistante" })
    try {
        voitureModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId
                    }
                }
            },
            (err, docs) => {
                if (err) return res.status(501).json(err)  
            }
        )

        userModel.findByIdAndUpdate(
            res.locals.user._id,
            {
                $pull: {
                    comments: {
                        commentId: req.body.commentId
                    }
                }
            },
            (err, docs) => {
                if (!err) return res.status(201).json(docs)
                else return res.status(501).json(err)
            }
        )

    } catch (error) {
        return res.status(501).json(error)
    }
}
