const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const users = require('../models/user');
const jwt = require('jsonwebtoken');

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await users.find({ googleId: profile.id, email: profile.emails[0].value });

      if (existingUser) {
        console.log('existingUser')
        const user = await users.updateOne({email: profile.emails[0].value}, {googleId: profile.id});
        return done(null, user);
      }
      console.log('!!!existingUser')
      const user = await new users({
        fullname: profile.name.familyName + ' ' + profile.name.givenName,
        email: profile.emails[0].value,
        googleId: profile.id,
      }).save();
      return done(null, user);
    })
);