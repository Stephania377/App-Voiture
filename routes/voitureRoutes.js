const router = require('express').Router()
const voitureController = require("../controllers/voitureController")
const { requireAuth } = require("../middleware/authMiddleware")
const multer = require("multer");
const upload = multer();
//voiture
router.get('/', voitureController.getAllVoiture)
router.post("/", [requireAuth, upload.single("file")], voitureController.createVoiture)
router.get('/:id', voitureController.readVoiture)
router.delete("/:id", requireAuth, voitureController.deleteVoiture)
router.patch("/:id", requireAuth, voitureController.updateVoiture)

module.exports = router