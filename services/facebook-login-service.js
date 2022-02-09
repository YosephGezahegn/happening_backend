const FacebookStrategy = require('passport-facebook').Strategy;
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = require('../model/user'); 
const dbService = require('../utils/dbService');
const userTokens = require('../model/userTokens');
const {
  JWT,LOGIN_ACCESS,USER_ROLE,PLATFORM
} = require('../constants/authConstant');

module.exports = {
  facebookStrategy: passport => {
    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENTID,
      clientSecret: process.env.FACEBOOK_CLIENTSECRET,
      callbackURL: process.env.FACEBOOK_CALLBACKURL
    }, async function (accessToken, refreshToken, profile, done) {
      if (profile){
        let userObj = {
          'username':profile.displayName,
          'sso_auth': { 'facebookId': profile.id },
          'email': profile.emails !== undefined ? profile.emails[0].value : '',
          'password':'',
          'role':USER_ROLE.User
        };
        let found = await dbService.getDocumentByQuery(User,{ 'email': userObj.email });
        if (found) {
          const id = found.id;
          await dbService.updateDocument(User, id, userObj);
        }
        else {
          await dbService.createDocument(User, userObj);
        }
        let user = await dbService.getDocumentByQuery(User,{ 'sso_auth.facebookId':profile.id });
        return done(null, user);
      }
      return done(null, null);
    }
    ));
  },
  loginUser: async (email, platform) => {
    try {
      const user = await dbService.getDocumentByQuery(User,{ email });
      if (user && user.email) {
        const { ...userData } = user.toJSON();
        let token;
        if (!user.role) {
          return {
            flag:true,
            data:'You have no assigned any role'
          };
        }
        if (platform == undefined){
          return {
            flag:true,
            data:'Please login through Platform'
          };
        }
        if (platform == 'admin'){
          if (!LOGIN_ACCESS[user.role].includes(PLATFORM.ADMIN)){
            return {
              flag:true,
              data:'you are unable to access this platform'
            };
          }
          token = await generateToken(userData,JWT.ADMIN_SECRET);
        }
        else if (platform == 'device'){
          if (!LOGIN_ACCESS[user.role].includes(PLATFORM.DEVICE)){
            return {
              flag:true,
              data:'you are unable to access this platform'
            };
          }
          token = await generateToken(userData,JWT.DEVICE_SECRET);
        }
        let expire = moment().add(JWT.EXPIRES_IN, 'seconds').toISOString();
        await dbService.createDocument(userTokens, {
          userId: user.id,
          token: token,
          tokenExpiredTime: expire 
        });
        const userToReturn = {
          ...userData,
          ...{ token } 
        };
        return {
          flag:false,
          data:userToReturn
        };
      }
      else {
        return {
          flag:true,
          data:'Email not exists'
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }

  }

};

async function generateToken (user,secret){
  return jwt.sign( {
    id:user.id,
    email:user.email,
    username: user.username || user.email
  }, secret, { expiresIn: JWT.EXPIRES_IN });
}