const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'That Email is not registered' })
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Password wrong' })
                    }
                })
            })
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user)
        })
    })
}