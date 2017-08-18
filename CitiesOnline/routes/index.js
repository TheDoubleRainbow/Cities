var express = require('express');
var router = express.Router();

/* GET home page. */
var rooms = [{name: 'New Room', id:0, data:{cities: [["", 8], ["", 7], ["", 6], ["", 5], ["", 4], ["", 3], ["", 2], ["", 1], ["", 0]],
	history: []}}]

var findRoom = function(id){
	for(var i = 0; i < rooms.length; i++){
		if (rooms[i].id == id) {
			return rooms[i]
		}
	}
}

router.get('/', function(req,res){
	res.render('rooms', {rooms: rooms});
})

router.get('/game', function(req, res, next) {
	if(req.query.id){
		if(findRoom(req.query.id)){
			res.render('game', {room: findRoom(req.query.id)});
		}
		else{
			res.render('rooms', {rooms: rooms});
		}
	}
	else{
		res.render('rooms', {rooms: rooms});
	}
});

module.exports = router;
