const Timer = (props) => {

	return(
  	<div className="text-center">
    	<h1>{Timer.format(props.cloak)}</h1>
    </div>
  )
}

Timer.format = (seconds) => {
	let minutes = parseInt(seconds / 60);
  let sec = seconds - minutes * 60;
  
  if(minutes < 10)
  	minutes = `0${minutes}`
  if(sec < 10)
  	sec = `0${sec}`
  
  return `${minutes}:${sec}`
}

const Button = (props) => {

	return(
  	<div>
  	  <div className="text-center">
        <button onClick={() => props.handleClick()} 
                className="btn btn-secondary start"
                disabled={props.working}>
          START
        </button>
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
      <button className="btn btn-success" 
      				onClick={() => (props.setTime(true, props.title))}
              disabled={props.time === 60}>
      	<i className="fa fa-plus"></i>
      </button>
      <button className="btn btn-danger" 
      				onClick={() => (props.setTime(false, props.title))}
              disabled={props.time === 1}>
      	<i className="fa fa-minus"></i>
      </button>
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
    countdown: 25*60,
    working: false,
    status: 'break'
  }
  
  setTime = (state, name) => {

    if(this.state.timer != null){
      this.setState((prev) => {
        clearInterval(prev.timer);
        return {timer: null, working: false}
      })
    }

  	this.setState((prev) =>{
    	if(name === "break"){
      	let val = prev.breakTime;
        if(val <= 1 && state === false)
        	return;
        return {breakTime: (state ? val + 1 : val -1)}
      }
      else if(name === "work"){
        let val = prev.workTime;
        if(val <= 1 && state === false)
            return;
        let tm = state ? val + 1 : val -1;
        return {workTime: tm, countdown: tm*60}
      }
    })
  }
  
  handleClick = () => {
  	if(this.state.timer != null){
      console.log(this.state.timer)
    }
  
  	this.setState((prev) => ({
      timer: setInterval(() => this.tick(), 1000),
      working: true,
      progress: 0,
      countdown: prev.workTime * 60,
      status: 'work'
    }))
  }
  
  componentDidMount() {
    // this.timerID = setInterval(
    //   () => this.tick(),
    //   1000
    // );
  }
  componentWillUnmount() {
    //clearInterval(this.timerID);
  }
  tick() {
  	if(this.state.progress >= 100){
      clearInterval(this.state.timer);
      this.setState({working: false})
      console.log('pomodoro!')

      return;
    }
    this.setState((prev) => {

      let oneTick = 100 / (prev.workTime * 60)
    	let newProgress = parseFloat((prev.progress + oneTick).toFixed(2));
    
    	return { progress: newProgress > 100 ? 100 : newProgress, countdown: prev.countdown-1 };
    });
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
          <Timer cloak = {this.state.countdown}/>
          <br />
          <Button handleClick={this.handleClick}
                  working={this.state.working} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);