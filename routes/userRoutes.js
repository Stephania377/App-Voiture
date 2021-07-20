const router = require('express').Router()
const authController = require('../controllers/authControllers')
const userController = require("../controllers/userController")
const uploadController = require("../controllers/uploadController") 
const { requireAuth } = require("../middleware/authMiddleware")
const multer = require("multer");
const upload = multer();
//auth
router.post('/register', authController.signUp)
router.post('/login', authController.signIn)
router.get('/logout', requireAuth, authController.logout)

//user
router.get('/', userController.getAllUser);
router.get("/:id", userController.userInfo);
router.put("/:id", requireAuth, userController.updateUser);
router.delete("/:id", requireAuth, userController.deleteUser);
router.post("/upload", [requireAuth, upload.single("file")], uploadController.uploadProfil);

module.exports = router