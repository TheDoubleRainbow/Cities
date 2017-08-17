'use strict'

var data = {
	cities: [["Винница", 8], ["Афины", 7], ["Нью-Йорк", 6], ["Киров", 5], ["Вильнюс", 4], ["Сватово", 3], ["Оттава", 2], ["Альбукерке", 1], ["Ереван", 0]]
}

class History extends React.Component{

	render(){
		return (
			<ul id="list">
				{this.state.cities.map(city => (<li className='listEl' key={city[1]} id={'o' + city[1]}>{city[0]}</li>))}
			</ul>
				)
	}
}

ReactDOM.render(<History />, document.getElementById('history'));

class Input extends React.Component{
	constructor(props){
		super(props);
		this.text = '',
		this.letter = '',
		this.setText = this.setText.bind(this)
	}

	setLetter = function(w){
		let letter = w[w.length-1].toUpperCase();
		if(letter != 'ы' && letter != 'ь' && letter != '-'){
			this.letter = letter;
		}
	}

	setText(e) {
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
				}
			}
			else{
				e.target.value = '';
				this.text = '';
			}
			
		}
	}

	submit() {
		if(this.text != '' && this.text != '-'){
			if(this.text[0] == this.letter && this.text.length > 1){
				this.
			}
		}

	}

	render(){
		this.setLetter("Ереван")
		return (
			<div>
				<div className="col-md-11 col-sm-11 col-xs-11 col-lg-11">
						<div className="input-group">
							<span className="input-group-addon">{this.letter}</span>
							<input onChange={this.setText} id="inputText" className="form-control" type='text' />
						</div>
				</div>
					<button id="button" className="btn btn-success col-lg-1 col-sm-1 col-xs-1 col-md-1">
						<span id="mark">✓</span>
					</button>
			</div>
			)
	}
}

ReactDOM.render(<Input />, document.getElementById('input'))




