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

router.get('/SendCity', function(req, res, next) {
  let city = req.query.city;
  if
});

router.get('/getCity', function(req, res, next) {
  res.send('respond with a resource');
});
//-----------
//functions |
//-----------
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

var checkCity = function(city, id) {
		if(!this.started){
			if(this.text != '' && this.text != '-'){
				if(this.text.length > 1){
					let isRepeat = false;
					for(var i = 0; i < data.data.history.length; i++){
						if(data.data.history[i] == this.text) isRepeat = true
					}
					if(!isRepeat){
						this.checkCity(this.text)
					}
				}
				else{
					ReactDOM.render(<Notification text='Введите корректный город' />, document.getElementById('notification'))
				}
			}
			else{
				ReactDOM.render(<Notification text='Поле не должно быть пустым' />, document.getElementById('notification'))
			}
		}
		else{
			if(this.text != '' && this.text != '-'){
				if(this.text[0].toUpperCase() == this.letter && this.text.length > 1){
					let isRepeat = false;
					for(var i = 0; i < data.data.history.length; i++){
						if(data.data.history[i] == this.text) isRepeat = true
					}
					if(!isRepeat){
						this.checkCity(this.text)
					}
					else{
						ReactDOM.render(<Notification text='Такой город уже был!' />, document.getElementById('notification'))
					}
				}
				else{
					ReactDOM.render(<Notification text={"Город должен начинаться с буквы '" + this.letter + "'"} />, document.getElementById('notification'))
				}
				}
			else{
				ReactDOM.render(<Notification text="Поле не должно быть пустым" />, document.getElementById('notification'))
			}
		}
	}


module.exports = router;
