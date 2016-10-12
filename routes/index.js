var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/:rule', function(req, res, next) {
  const rule = req.params.rule;
  res.render('celular', { 'title': `Rule ${rule}`, rule });
});

module.exports = router;
