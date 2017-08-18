var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/getData', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/SendCity', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getCity', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
