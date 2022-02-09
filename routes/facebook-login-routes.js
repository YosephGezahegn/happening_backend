const express = require('express');
const session = require('express-session');
const router = express.Router();
const passport = require('passport');

const {
  facebookStrategy,loginUser 
} = require('../services/facebook-login-service');

//facebook
facebookStrategy(passport);

router.use(passport.initialize());

router.use(session({
  secret: 'my-secret',
  resave:true,
  saveUninitialized:false
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  cb(null, user);
});

router.get('/auth/facebook/error', (req, res) => {
  utils.loginFailed('Login Failed',res);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['profile'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/error' }),
  function (req,res){
    loginUser(req.user.email,req.session.platform).then(result=>{
      if (result.flag){
        return res.loginFailed(result.data);
      }
      return res.loginSuccess(result.data);
    })
      .catch(error=>{
        return res.failureResponse(error);
      });
  }
);

module.exports = router;