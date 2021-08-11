const express =  require('express');
const passport = require('passport')

const router = express.Router();

const postsApi = require('../../../controllers/api/v1/post_api');

router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postsApi.destroy); //for delete req use delete, to 
//prevent session cookies from being generated.

module.exports = router;