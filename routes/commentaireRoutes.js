const router = require('express').Router()
const commentaireController = require("../controllers/commentaireController")
const { authorizeComments } = require("../middleware/authMiddleware")

router.post("/:id", commentaireController.createComment)
router.patch("/:id", authorizeComments, commentaireController.editComment)
router.delete("/:id",authorizeComments, commentaireController.deleteComment)

module.exports = router