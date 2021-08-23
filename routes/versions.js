const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const VersionCheck = require('../models/Versions')

router.post('/check_version', async(req, res) => {
    res.json({ message: "NEE VERPISS DICH" })
})

router.get('/exploit_tool', async(req, res) => {
    await VersionCheck.findOne({ program: "ExploitTool" }, function(err, data) {
        res.json({ program: data.program, version: data.version })
    })
})

router.get('*', async(req, res) => {
    res.render('403')
})

module.exports = router;