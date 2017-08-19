'use strict'

class AddRoom extends React.Component{
	constructor(props) {
		super(props),
		this.add=this.add.bind(this)
		this.editName=this.editName.bind(this)
		this.openFull=this.openFull.bind(this)
		this.name;
	}

	openFull(){
		document.getElementById('createRoom').style.cssText="height: 300%;";
		document.getElementById('addRoom').style.cssText="display: block;";
	}

	editName(e){
		this.name = e.target.value;
	}

	add(e){
		if(e.key == 'Enter') {
			axios.get('/addRoom?name='+this.name)
  			.then(function (response) {
  				console.log(response)
    			if(response.data.status != 'ok'){
    				ReactDOM.render(<Notification text={response.data.status} />, document.getElementById('notification'))
    			}
    			else{
    				location = '/game?id='+response.data.id;
    			}
  			})
  			.catch(function (error) {
  				console.log(error)
  				ReactDOM.render(<Notification text='Error' />, document.getElementById('notification'))
  			});
		}
	}

	render(){
		return(
				<div onClick={this.openFull} id="createRoom">
					Создать комнату
					<div id='addRoom'>
						<label>Имя комнаты:</label><br /><input onKeyPress={this.add} onChange={this.editName} type='text' id="addRoomInput" className="form-control" />
					</div>
				</div>
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

ReactDOM.render(<AddRoom />, document.getElementById('react-room'))


