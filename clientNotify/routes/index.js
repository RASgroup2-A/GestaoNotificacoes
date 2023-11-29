var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/:numero', function(req, res, next) {
  numero = req.params.numero
  res.render('index', { "numero":numero });
});

module.exports = router;
