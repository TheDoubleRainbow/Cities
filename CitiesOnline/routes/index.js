var express = require('express');
var router = express.Router();

/* GET home page. */
var rooms = []

router.get('/', function(req,res){
	res.render('rooms', {});
})

router.get('/game', function(req, res, next) {
  res.render('game', {});
});

module.exports = router;
