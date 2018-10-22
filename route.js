var express = require('express');
var router = express.Router();
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');


passport.use(new BearerStrategy(
  function(token,done,next){
    User.findOne({
      where : {
        user_key : token
      }
    }).then((user) => {
      if(!user) return done(null,false)

      return done(null,user,{scope : 'all'})
    })
  }
))


/* GET users listing. */
router.get('/',passport.authenticate('bearer', {session : false}), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

