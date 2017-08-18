'use strict'



class History extends React.Component{
	render(){
		return (
			<ul id="list">
				{data.cities.map(city => (<li className='listEl' key={city[1]} id={'o' + city[1]}>{city[0]}</li>))}
			</ul>
				)
	}
}

class Input extends React.Component{
	constructor(props){
		super(props);
		this.text = '',
		this.letter = 'Н',
		this.setText = this.setText.bind(this),
		this.submit = this.submit.bind(this)
		this.emitSubmit = this.emitSubmit.bind(this)

	}

	setLetter = function(w){
		let letter = w[w.length-1].toUpperCase();
		if(letter != 'Ы' && letter != 'Ь' && letter != '-'){
			this.letter = letter;
			ReactDOM.render(<Input />, document.getElementById('input'))
		}
		else{
			this.letter = w[w.length-2].toUpperCase();
			ReactDOM.render(<Input />, document.getElementById('input'))
		}
	}

	setText(e) {
		console.log(this.props)
		let text = e.target.value
		if(text != ''){
			let test = text.match(/[a-z,A-Z,А-Я,а-я,\-,і]/gi);
			if(test != null ){
				test = test.join("")
				if(test == text){
					this.text = text;
				}
				else{
					e.target.value = this.text;
					this.notificate("Вводите только буквы, а также знак '-'")
				}
			}
			else{
				e.target.value = '';
				this.text = '';
				this.notificate("Вводите только буквы, а также знак '-'")
			}
			
		}
	}

	updateData(newCity) {
		newCity = newCity[0].toUpperCase() + newCity.slice(1)
		for(let i = 1; i < 9; i++){
			data.cities[i-1][0] = data.cities[i][0];
		}
		data.cities[8][0] = newCity;
		data.history.push(newCity);
		console.log(data)
	}

	submit() {
		if(this.text != '' && this.text != '-'){
			if(this.text[0].toUpperCase() == this.letter && this.text.length > 1){
				let isRepeat = false;
				for(var i = 0; i < data.history.length; i++){
					if(data.history[i] == this.text) isRepeat = true
				}
				if(!isRepeat){
					this.updateData(this.text);
					this.setLetter(this.text);
					document.getElementById('inputText').value = '';
					ReactDOM.render(<History />, document.getElementById('history'));
				}
			}
			this.notificate("Город должен начинаться с буквы '" + this.letter + "'");
		}
		else{
			this.notificate("Поле не должно быть пустым")
		}

	}

	emitSubmit(e){
		if(e.key == 'Enter') {
			this.submit()
		}
	}

	notificate(text){
		var delay = false;
		var notification = document.getElementById('notification');
		ReactDOM.render(<div>{text}</div>, notification)
		if(!delay){
			delay = true

			$("#notification").animateCss('slideInDown')
			notification.style.display = 'block'
			setTimeout(function() {
				$("#notification").animateCss('flipOutX')
				setTimeout(function() {notification.style.display = 'none'; delay = false}, 700);
			}, 3000);
		}
	}

	start(){
		const startDiv = (
			<div>
				<div id="mainCity">Введите начальный город:</div>
				<input />
			</div>
		)
	}

	render(){
		return (
			<div>
				<div className="col-md-11 col-sm-11 col-xs-11 col-lg-11">
						<div className="input-group">
							<span className="input-group-addon">{this.letter}</span>
							<input onKeyPress={this.emitSubmit} onChange={this.setText} id="inputText"  className="form-control" type='text' />
						</div>
				</div>
					<button id="button" onClick={this.submit} className="btn btn-primary col-lg-1 col-sm-1 col-xs-1 col-md-1">
						<span id="mark">✓</span>
					</button>
			</div>
			)
	}
}

var data = {
	cities: [["", 8], ["", 7], ["", 6], ["", 5], ["", 4], ["", 3], ["", 2], ["", 1], ["", 0]],
	history: []
}

ReactDOM.render(<Input />, document.getElementById('input'));
ReactDOM.render(<History />, document.getElementById('history'));


