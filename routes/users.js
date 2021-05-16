const express = require('express');
const router = express.Router();
const passport = require('passport');

const userController = require('../controllers/users_controller');

router.get('/profile' , passport.checkAuthentication, userController.profile);

router.get('/sign-up', userController.singUp);
router.get('/sign-in', userController.singIn);


router.post('/create',userController.create);

//user passport as middleware authentication
router.post('/create-session', passport.authenticate( //first authentication takes place
    'local',
    {failureRedirect: '/users/sign-in'},
), userController.createSession);

router.get('/sign-out',userController.destroySession);
module.exports = router;