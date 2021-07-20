const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")


module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.cookie("jwt", "", { maxAge: 1 })
                console.log("inconnue qui tente de pirater le token")
                next()
            }
            else {
                const user = await userModel.findById(decodedToken.id).select("-password");
                // console.log(res.locals)
                res.locals.user = user;
                console.log("visiteur abonnee")
                next()
            }
        })
    }
    else {
        res.locals.user = null;
        console.log("visiteur inconnue")
        next()
    }
}

module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ error: "unauthentified" })
            } else {
                next()
            }
        })
    }
    else {
        return res.status(401).json({ error: "unauthentified" })
    }
}

// //seciruter des modifier ,supprimer profil
// module.exports.totalSecurityUser = (req, res, next) => {
//     const token = req.cookies.jwt;
//     if (token) {
//         jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
//             if (err) {
//                 return res.status(401).json({ error: "unauthentified" })
//             } else {
//                 if (req.params.id === decodedToken.id)
//                     next()
//                 else
//                     return res.status(401).json({ error: "action inauthoriser" })
//             }
//         })
//     }
//     else {
//         return res.status(401).json({ error: "unauthentified" })
//     }
// }


//secruiter des commentaires
module.exports.authorizeComments = (req, res, next) => {
    let verified = false
    res.locals.user.comments.map(comment => {
        if (comment.commentId == req.body.commentId) {
            verified = true
        }
    });

    if (verified) {
        next()
    }
    else {
        return res.status(401).json({ error: "authorization failed" })
    }
}
