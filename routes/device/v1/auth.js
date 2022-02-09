/**
 * auth.js
 * @description :: routes of authentication APIs
 */

const express =  require('express');
const routes  =  express.Router();
const session = require('express-session');
const auth = require('../../../middleware/auth');
const authController =  require('../../../controller/device/v1/authController');  

routes.route('/register').post(authController.register);
routes.post('/login',authController.login);
routes.route('/forgot-password').post(authController.forgotPassword);
routes.route('/validate-otp').post(authController.validateResetPasswordOtp);
routes.route('/reset-password').put(authController.resetPassword);
routes.get('/login/google',(req,res)=>{
  req.session.platform = 'device';
  res.redirect(`http://localhost:${process.env.PORT}/auth/google`);
});       
routes.get('/login/facebook',(req,res)=>{
  req.session.platform = 'device';
  res.redirect(`http://localhost:${process.env.PORT}/auth/facebook`);
});       
routes.route('/logout').post(auth(...[ 'logoutByUserInDevicePlatform', 'logoutByAdminInDevicePlatform' ]), authController.logout);

module.exports = routes;