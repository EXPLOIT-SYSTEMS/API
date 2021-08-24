const express = require('express');
const router = express.Router();
const use = require('../models/User');
const inv = require('../models/Invite')
const acc = require('../models/accounts')
const { ensureAuthenticated } = require('../config/auth')

router.get('/', async(req, res) => {
    res.redirect('/dashboard')
})

router.get('/discord', async(req, res) => {
    res.redirect('https://discord.gg/6fwEr386Da')
})

router.get('/donate', async(req, res) => {
    res.redirect('https://warenkorb.prepaid-hoster.de/donation/3092610a-9c76-4d6b-8ff7-8449825b7c12')
})

router.get('/faq', async(req, res) => {
    res.render('faq')
})

router.get('/dashboard', ensureAuthenticated, async(req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    await use.findOneAndUpdate(
        { email: req.user.email }, 
        { ip: ip.toString() }
    )
    if (req.user.banned === true) {
        req.logout();
        res.redirect('/users/ban');
    } else {
        use.find({}, function(err, users) {
            res.render('dashboard', {
                User: req.user,
            })
        })
    }
})

router.get('/403', async(req, res) => {
    res.render('403')
})

router.get('/admin', ensureAuthenticated, async(req, res) => {
    if (req.user.rank != "Admin") {
        res.render('403')
        return
    } else {
        use.find({}, function(err, users) {
            inv.find({}, function(err, invs) {
                acc.find({}, function(err, accs){
                    res.render('admin', {
                        AllAccs: accs,
                        AllUser: users,
                        Invites: invs
                    })
                })
            })
        })
    }
})

module.exports = router;