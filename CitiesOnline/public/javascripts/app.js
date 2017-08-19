'use strict'



class History extends React.Component{
	render(){
		return (
			<ul id="list">
				{data.data.cities.map(city => (<li className='listEl' key={city[1]} id={'o' + city[1]}>{city[0]}</li>))}
			</ul>
				)
	}
}

class Notification extends React.Component{
	constructor(props) {
		super(props);
		this.delay = false;
		this.notification = document.getElementById('notification');
	}

	animate(){
		if(!this.delay){
			this.delay = true;
			let that = this;
			this.notification.style.display = 'block';
			$("#notification").animateCss('flipInX');
			setTimeout(function() {
				$("#notification").animateCss('flipOutX')
				that.delay = false;
				setTimeout(function() {that.notification.className = 'col-md-4 col-md-offset-4 col-lg-4 col-lg-offset-4 col-sm-8 col-sm-offset-2 col-xs-8 col-xs-offset-2'; that.notification.style.display = 'none';}, 700);
			}, 3000);
		}
	}
	render(){
		this.animate()
		return(
				<div>{this.props.text}</div>
			)
	}
}

class Input extends React.Component{
	constructor(props){
		super(props),
		this.started = false,
		this.text = '',
		this.letter = '',
		this.setText = this.setText.bind(this),
		this.checkCity = this.checkCity.bind(this),
		this.submit = this.submit.bind(this),
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
		let text = e.target.value
		if(text != ''){
			let test = text.match(/[a-z,A-Z,А-Я,а-я,\-,ї,і]/gi);
			if(test != null ){
				test = test.join("")
				if(test == text){
					this.text = text;
				}
				else{
					e.target.value = this.text;
					ReactDOM.render(<Notification text='Вводите только буквы, а также знак "-"' />, document.getElementById('notification'))
				}
			}
			else{
				e.target.value = '';
				this.text = '';
				ReactDOM.render(<Notification text='Вводите только буквы, а также знак "-"' />, document.getElementById('notification'))
			}
			
		}
	}

	updateData(newCity) {
		newCity = newCity[0].toUpperCase() + newCity.slice(1)
		for(let i = 1; i < 9; i++){
			data.data.cities[i-1][0] = data.data.cities[i][0];
		}
		data.data.cities[8][0] = newCity;
		data.data.history.push(newCity);
	}


	emitSubmit(e){
		if(e.key == 'Enter') {
			this.submit()
		}
	}

	checkCity(city){
		var that = this
		axios.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ city +'&key=AIzaSyB81xDY0BEAdi4uv-izLsDS4rnjGb1UgYg').then(function (response) {
    		if(response.data.results[0].address_components[0].short_name == city){
    			if(!that.started){
    				that.updateData(that.text);
					that.setLetter(that.text);
					document.getElementById('inputText').value = '';
					ReactDOM.render(<History />, document.getElementById('history'));
					that.started = true;
				}
				else{
					that.updateData(that.text);
					that.setLetter(that.text);
					document.getElementById('inputText').value = '';
					ReactDOM.render(<History />, document.getElementById('history'));
				}
    		}
    		else{
    			ReactDOM.render(<Notification text='Такого города не существует!' />, document.getElementById('notification'))
    		}
  		}).catch(function (error) {
   			 ReactDOM.render(<Notification text="Такого города не существует!" />, document.getElementById('notification'));
  		});
  	}

	render(){
		return (
			<div className="animated flipInX">
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

/*var data = {
	cities: [["", 8], ["", 7], ["", 6], ["", 5], ["", 4], ["", 3], ["", 2], ["", 1], ["", 0]],
	history: []
}*/

ReactDOM.render(<Input />, document.getElementById('input'));
ReactDOM.render(<History />, document.getElementById('history'));
ReactDOM.render(<Notification text='Введите первый город' />, document.getElementById('notification'))




