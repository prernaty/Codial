const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile' , userController.profile)

router.get('/sign-up', userController.singUp);
router.get('/sign-in', userController.singIn);


router.post('/create',userController.create);

module.exports = router;