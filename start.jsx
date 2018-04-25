const Timer = (props) => {

	return(
  	<div className="text-center">
    	<h1>13:37</h1>
    </div>
  )
}

const Button = (props) => {

	return(
  	<div>
  	  <div className="text-center">
      	<button className="btn btn-secondary start">START</button>
      </div>
  	</div>
  )
}

const Setter = (props) => {
	return(
  	<div className="col col-sm-6 text-center">
    	<h3>{props.title}</h3>
      <span>{props.time}</span>
      <br />
      <button className="btn btn-success" onClick={() => (props.setTime(true, props.title))}>+</button>
      <button className="btn btn-danger" onClick={() => (props.setTime(false, props.title))}>-</button>
    </div>
  )
}

const Battery = (props) => {
  //const percent = props.progress + "%";

	return(
  	<div>
  	  <div className="row text-center">
        <div className="col col-sm-4 offset-sm-4">
          <div className="battery">
          <div style={{height: props.progress+'%'}} className=""></div>
        	</div>
        </div>
      </div>
  	</div>
  )
}


class App extends React.Component{
  state = {
    workTime: 25,
    breakTime: 5,
    progress: 0,
    timer: null,
    counter: 0
  }
  
  setTime = (state, name) => {
  	this.setState((prev) =>{
    	if(name === "break"){
      	let val = prev.breakTime;
        if(val <= 0 && state === false)
        	return;
        return {breakTime: (state ? val + 1 : val -1)}
      }
      else if(name === "work"){
        let val = prev.workTime;
        if(val <= 0 && state === false)
            return;
        return {workTime: (state ? val + 1 : val -1)}
      }
    })
  }
  
componentDidMount() {
    let timer = setInterval(this.tick, 1000);
    this.setState({timer});
  }
componentWillUnmount() {
    this.clearInterval(this.state.timer);
  }
tick() {
    
  }

  render(){
    return(
      <div>
        <div className="container">
          <div className="row">
            <Setter className="setting" title="break" time={this.state.breakTime} setTime={this.setTime}/>
            <Setter className="setting" title="work" time={this.state.workTime} setTime={this.setTime}/>
          </div>
          <Battery progress={this.state.progress}/>
          <br />
          <Timer />
          <br />
          <Button />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);