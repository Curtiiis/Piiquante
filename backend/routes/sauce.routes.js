const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const saucesCtrl = require('../controllers/sauce.controller')
const limiter = require('../middleware/limiter')

//Router CRUD
router.post  ('/',    limiter, auth, multer, saucesCtrl.createSauce)
router.put   ('/:id', limiter, auth, multer, saucesCtrl.modifySauce)
router.delete('/:id', limiter, auth, saucesCtrl.deleteSauce)
router.get   ('/',    limiter, auth, saucesCtrl.getAllSauces)
router.get   ('/:id', limiter, auth, saucesCtrl.getOneSauce)

//Router LIKE
router.post('/:id/like', limiter, auth, saucesCtrl.likeSauce)

module.exports = router;