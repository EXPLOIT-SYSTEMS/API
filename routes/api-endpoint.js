const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const { v4: uuidv4 } = require('uuid');
const InviteKeys = require('../models/Invite');
const Licenses = require('../models/licenses')
const AccGen = require('../models/accounts')
const bcrypt = require('bcryptjs');
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000 * 24, // 24 h
    max: 1, // limit each IP to 1 request per windowMs
    message: 'EXPLOIT API: You sending to many packages, please come back later!'
  });

router.post('/auth', urlencodedParser, async(req, res) => {
    const rquser = req.body

    User.findOne({ email: rquser.email })
        .then(async user => {
            if (user.banned == true) {
                return res.json({ data: 'U are banned!' })
            }
            if (user.hwid == "none"){
                hwid = rquser.hwid
                await User.findOneAndUpdate(
                    { email: rquser.email },
                    { hwid: hwid }
                )
                return res.json({ data: "Setting up your HWID for the first time!" })
            } else {
                if (user.hwid != rquser.hwid) return res.json({ data: "HWID does not match!" })
            }
            bcrypt.compare(rquser.password, user.password, (err, isMatch) => {
                if (isMatch) {
                    return res.json({ data: 'duhwjrfert8uizefr9873z432s', user: user.username, rank: user.rank, id: user._id })
                } else {
                    return res.json({ data: 'Password wrong!' })
                }
            })
        })
})

router.post('/use_license', urlencodedParser, async(req, res) => {
    await Licenses.findOneAndDelete({ token: req.body.token }).then(key => {
        res.json({data: "bfg43r89sdfhbgesjki34r65"})
    })
})

router.post('/skid', urlencodedParser, async(req, res) => {
    const skid = req.body
    const newValue = true
    console.log(`Incomming: ${skid.email} !`)
    await User.findOneAndUpdate(
        { email: skid.email },
        { banned: newValue }
    )
    res.json({ data: 'You are now banned xD' })
})

router.post('/add_invitekey_admin', urlencodedParser, async(req, res) => {
    const rquser = req.user;
    const key = uuidv4();
    if (rquser.rank == "Admin") {
        const newKey = InviteKeys({
            code: key,
            by: rquser.username,
            email: rquser.email
        })
        newKey.save()
        res.redirect('/admin')
    }
})

router.post('/buy_uni_license', urlencodedParser, async(req, res) => {
    const rquser = req.user
    const currentPoints = req.user.points
    const newPoints = currentPoints - 10
    await User.findOneAndUpdate(
        { email: rquser.email },
        { points: newPoints }
    )
    const key = uuidv4()
         const newKey = Licenses({
             program: "Universal",
             token: key,
             user: rquser.email
         })
         newKey.save()
         res.redirect('/market#licenses_section')
})

router.post('/buy_invite', urlencodedParser, async(req, res) => {
    const rquser = req.user;
    const currentPoints = req.user.points
    const newPoints = currentPoints - 300
    await User.findOneAndUpdate(
        { email: rquser.email },
        { points: newPoints }
    )
    const key = uuidv4();
    if (rquser) {
        const newKey = InviteKeys({
            code: key,
            by: rquser.username,
            email: rquser.email
        })
        newKey.save()
        res.redirect('/market#licenses_section')
    }
})

router.post('/account_delete_request', urlencodedParser, async(req, res) => {
    const rquser = req.user;
    await User.findOneAndDelete({ email: rquser.email })
    req.logout()
    res.redirect('/users/login')
})

router.post('/change_username_request', urlencodedParser, async(req, res) => {
    const rquser = req.user
    const newName = req.body.username
    if (req.user) {
        if (newName == "") {
            res.redirect('/users/settings')
        } else {
            await User.findOneAndUpdate(
                { email: rquser.email }, 
                { username: newName }
            )
            res.redirect('/users/settings')
        }
    } else {
        res.render('403')
    }
})

router.post('/manage_member_entry', urlencodedParser, async(req, res) => {
    const adminUser = req.user
    const skid = req.body
    if (adminUser) {
        if (adminUser.rank == 'Admin') {

            if (skid.email == "rias@localhost.de") {
                res.render('403')
                return
            }

            if (skid.action == "ban") {
                const newValue = true
                await User.findOneAndUpdate(
                    { email: skid.email },
                    { banned: newValue }
                )
            }
            if (skid.action == "unban") {
                const newValue = false
                await User.findOneAndUpdate(
                    { email: skid.email },
                    { banned: newValue }
                )
            }
            if (skid.action == "delete") {
                await User.findOneAndDelete({ email: skid.email })
            }
            if (skid.action == "hwid") {
                const newValue = "none"
                await User.findOneAndUpdate(
                    { email: skid.email },
                    { hwid: newValue }
                )
            }
            if (skid.rank != "none") {
                const newRank = skid.rank
                await User.findOneAndUpdate(
                    { email: skid.email },
                    { rank: newRank }
                )
            }
            res.redirect('/admin')

        } else {
        res.render('403')
        }
    }
})

router.get('/get_acc', limiter, async(req, res) => {
    var randomnumber = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    AccGen.findOne({accnumber: randomnumber}).then(async gen => {
        res.json(gen)
    })
})

router.get('*', async(req, res) => {
    res.render('403')
})

module.exports = router;