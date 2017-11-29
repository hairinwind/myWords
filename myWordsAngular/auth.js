const envConfig = require('./server/config/envConfig');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const expressSession = require('express-session');

var passportInit = (app) => {
  passport.use(
    new FacebookStrategy({
      clientID: '366973747029985',
      clientSecret: 'bcbd4ecdb2a56c4adfc921bafae58161',
      callbackURL: envConfig.facebook.callback,  
      profileFields: ['id', 'email', 'first_name', 'last_name'],
    },
    function(accessToken, refreshToken, profile, done) {
      var email = (profile.emails[0].value || '').toLowerCase();
      if (email == 'dong_yao@hotmail.com') {
        return done(null, profile);  
      } else {
        return done('user is not allowed...');
      }
    }
  ));
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
  app.use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/auth/facebook' }));
};

module.exports = {  
  init : (app) => {
    passportInit(app);
  }, 
  authenticate: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/');
  }
};