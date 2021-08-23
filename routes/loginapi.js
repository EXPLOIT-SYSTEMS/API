const express = require('express');
const { Mongoose } = require('mongoose');
const router = express.Router();
const User = require('../models/User');
const InviteKeys = require('../models/Invite')
const { check, validationResult } = require('express-validator');
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const bcrypt = require('bcryptjs');
const passport = require('passport')
const { v4: uuidv4 } = require('uuid');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://ptb.discord.com/api/webhooks/809128337577869351/BOH3m5qymvVh9jAfDI-aJ_AT2WdB0-6c--wS7aGnSkKlOhiamCoz21C8NULhpRuBfZ59");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000 * 24, // 24 h
    max: 1, // limit each IP to 1 request per windowMs
    message: 'EXPLOIT API: You sending to many packages, please come back later!'
  });

router.get('/login', async(req, res) => {
    res.render('login')
})

router.get('/register', async(req, res) => {
    res.render('register')
})

router.post('/login', urlencodedParser, async(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login'
    })(req, res, next)
})

router.post('/register', limiter, urlencodedParser, [
    check('username', 'The username must be 3+ chars long!')
        .exists()
        .isLength({ min: 3, max: 16 }),
    check('email', 'Email is not valid!')
        .isEmail()
        .isLength({ max: 50 })
], async(req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const alert = errors.array()
        res.render('register', {
            alert
        })
        return
    }
    else {
            if (await User.collection.findOne({email: req.body.email})) return res.redirect('/users/register')
            await InviteKeys.collection.findOne({code: req.body.invite}, function(err, keyDoc) {
            if (InviteKeys.collection.findOneAndDelete({ code: req.body.invite })) {
                const token = uuidv4();
                const regUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    usedKey: keyDoc.code,
                    invitedBy: keyDoc.by,
                    token: `token_${token}`
                })
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(regUser.password, salt, (err, hash) => {
                        //SET TO HASH
                        regUser.password = hash
                        regUser.save().then(user => {
                        res.redirect('/users/login')
                    })
                }))
            }
            else {
                res.redirect('/users/register')
            }
            })
                const embet = new MessageBuilder()
                .setAuthor('EXPLOIT WEBPAGE')
                .setTitle('NEW USER')
                .addField('Username', req.body.username)
                .setImage('https://cdn.discordapp.com/attachments/773593526239756338/809129892678598697/logo.png')
                .setFooter('Thanks for Register!')
                .setTimestamp()
                .setColor('#ff0000')
                hook.send(embet)
        }
})

router.get('/ban', async(req, res) => {
    res.render('ban')
})

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/users/login')
})

router.get('/settings', (req, res) => {
    UserData = req.user
    if (UserData) {
        res.render('user_settings', {
            User: UserData
        })
    } else {
        res.render('403')
    }
})

module.exports = router;