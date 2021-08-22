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
      if (profile.id) {

        users.findOne({ googleId: profile.id })
          .then((existingUser) => {
            if (existingUser) {
              done(null, existingUser);
            } else {
              new users({
                googleId: profile.id,
                email: profile.emails[0].value,
                fullname: profile.name.familyName + ' ' + profile.name.givenName
              })
                .save()
                .then(user => done(null, user));
            }
          })
      }
    }
));