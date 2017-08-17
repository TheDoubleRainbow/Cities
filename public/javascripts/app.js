'use strict'

class Cities extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cities: [["Винница", 8], ["Афины", 7], ["Нью-Йорк", 6], ["Киров", 5], ["Вильнюс", 4], ["Сватово", 3], ["Оттава", 2], ["Альбукерке", 1], ["Ереван", 0]],
			text: '',
			letter: ''
		}
	}

	render(){
		return (
			<ul id="list">
				{this.state.cities.map(city => (<li className='listEl' key={city[1]} id={'o' + city[1]}>{city[0]}</li>))}
			</ul>
				)
	}
}

ReactDOM.render(<Cities />, document.getElementById('history'))