'use strict'

var express = require('express');
var router = express.Router();
var rooms = []
//-------
//pages |
//-------
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
//------
//data |
//------
router.get('/addRoom', function(req, res){
	let name = req.query.name;
	let test = name.match(/[a-z,A-Z,А-Я,а-я,0-9,\-,\ ,ї,і]/gi);
			if(test != null ){
				test = test.join("")
				if(test == name){
					let id = getId()
					rooms.push({name: name, id: id, users: 0, data:{cities: [["", 8], ["", 7], ["", 6], ["", 5], ["", 4], ["", 3], ["", 2], ["", 1], ["", 0]],
	history: [], letter: ''}})
					res.send({status: 'ok', id: id})
					setTimeout(function() {rooms.pop(findRoom(id))}, 3600000);
				}
				else{
					res.send({status: 'Введите корректное имя комнаты'})
				}
			}
			else{
				res.send({status: 'Введите корректное имя комнаты'})
			}
});

router.get('/getData', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/sendCity', function(req, res, next) {
  let city = req.query.city;
  res.send(checkCity(city, 1))

});

router.get('/getCity', function(req, res, next) {
  res.send('respond with a resource');
});
//-----------
//functions |
//-----------

//rooms
var findRoom = function(id){
	for(var i = 0; i < rooms.length; i++){
		if (rooms[i].id == id) {
			return rooms[i]
		}
	}
}

var getId = function(){
	let id = 0;
	for(var i = 0; i < rooms.length; i++){
		if (rooms[i].id > id) {
			id = rooms[i].id;
			console.log(id)
		}
	}
	return id+1
}

//game

var setLetter = function(w, id){
	let letter = w[w.length-1].toUpperCase();
	if(letter != 'Ы' && letter != 'Ь' && letter != '-'){
		findRoom(id).data.letter = letter;
	}
	else{
		findRoom(id).data.letter = w[w.length-2].toUpperCase();
	}
}

var updateRoomData = function(newCity, id){
	newCity = newCity[0].toUpperCase() + newCity.slice(1)
	for(let i = 1; i < 9; i++){
		findRoom(id).data.cities[i-1][0] = findRoom(id).data.cities[i][0];
	}
	findRoom(id).data.cities[8][0] = newCity;
	findRoom(id).data.history.push(newCity);
}

var addCity = function(city, id){
	setLetter(city, id);
	updateRoomData(city, id);

	return { status: 'ok', data: findRoom(id)}
}

var checkCity = function(city, id) {
	let message = {
		status: 'error'
	}
		if(!findRoom(id).data.history[0]){
			if(city != '' && city != '-'){
				if(city.length > 1){
					let isRepeat = false;
					for(var i = 0; i < findRoom(id).data.history.length; i++){
						if(findRoom(id).data.history[i] == city) isRepeat = true
					}
					if(!isRepeat){
						message = addCity(city, id);
					}
				}
				else{
					message.status = 'Введите корректный город';
				}
			}
			else{
				message.status = 'Поле не должно быть пустым';
			}
		}
		else{
			if(city != '' && city != '-'){
				if(city[0].toUpperCase() == findRoom(id).data.letter && city.length > 1){
					let isRepeat = false;
					for(var i = 0; i < findRoom(id).data.history.length; i++){
						if(findRoom(id).data.history[i] == city) isRepeat = true
					}
					if(!isRepeat){
						message = addCity(city, id);
					}
					else{
						message.status = 'Такой город уже был!';
					}
				}
				else{
					message.status = "Город должен начинаться с буквы '" + findRoom(id).data.letter + "'";
				}
				}
			else{
				message.status = 'Поле не должно быть пустым'
			}
		}
		return message
	}


module.exports = router;
