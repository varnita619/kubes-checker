const express = require('express');
const { getRepos } = require('../controllers/getRepos');

const router = express.Router();

router.route("/repos").get(getRepos)

module.exports = router;
