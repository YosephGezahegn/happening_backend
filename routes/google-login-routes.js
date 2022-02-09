const express = require('express');
const session = require('express-session');
const router = express.Router();
const passport = require('passport');

const {
  googleStrategy,loginUser 
} = require('../services/google-login-service');

//google
googleStrategy(passport);

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

router.get('/auth/google/error', (req, res) => {
  utils.loginFailed('Login Failed',res);
});

router.get('/auth/google',passport.authenticate('google', { 
  scope: ['profile', 'email'],
  session:false 
}));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
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