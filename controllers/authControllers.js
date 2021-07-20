const userModel = require("../models/userModel")
const jwt = require("jsonwebtoken")


const maxAge = 3 * 24 * 60 * 68 * 100

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge })
}

module.exports.signUp = async (req, res) => {
    if (!req.body.email || !req.body.pseudo || !req.body.password)
        return res.status(500).json({ error : "Tous les champs sont obligatoires" })
    const { pseudo, email, password } = req.body;
    try {
        const user = await userModel.create({ pseudo, email, password })
        return res.status(201).json({ user: user._id });
    } catch (error) {
        if (error.keyValue.email) {
            return res.status(200).json({ error: "Mail déjà prise ou invalide" })
        }
        if (error.keyValue.pseudo) {
            return res.status(200).json({ error: "Pseudo déjà pris" })
        }
        return res.status(500).json({ error })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
    console.log("signIp")
    try {
        const user = await userModel.login(email, password)
        if (user) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { httpOnly: true, maxAge })
            return res.status(200).json({ user: user._id })
        }
        return res.status(200).json({ error: "Mot de passe incorrecte ou email déjà prise" })
    } catch (error) {
        return res.status(401).json({ error })
    }
}

module.exports.logout = async (req, res) => {
    console.log("logout")
    res.cookie('jwt', '', { maxAge: 1 });
    return res.status(200).json({ status: "ok" })
}