// https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents
// repl used: https://jscomplete.com/repl/



const Stars = (props) => {
  const numberOfStars = 1 + Math.floor(Math.random()*9);


  return (
    <div className="col-5">
      {
        _.range(numberOfStars).map((num, i) =>
        <i key={i} className="fa fa-star"></i>
      )
      }
    </div>
  )
}

const Button = (props) => {
  return (
    <div className="col-2">
      <button>=</button>
    </div>
  )
}

const Answer = (props) => {
  return (
    <div className="col-5">
      {props.selectedNumbers.map((num, i) => {
        <span key={i}>{num}</span>
      })}
    </div>
  )
}

const Numbers = (props) => {

  const numberClassName = (num) => {
    if(props.selectedNumbers.indexOf(num) >= 0)
      return "selected"
  } 

  return(
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => 
            <span key={i} className={numberClassName(number)}>{number}</span>
          )}
      </div>
    </div>
  )
}

// do that when variable is shared with all instances of component and not related to any logic inside component
Numbers.list = _.range(1,10);

class Game extends React.Component{
  state = {
    selectedNumbers: [2, 4]
  }

	render(){
  	return(
    	<div className="container">
    	  <h3>PlayNine</h3>
        <hr />
        <div className="row">
          <Stars />
          <Button />
          <Answer selectedNumbers={this.state.selectedNumbers}/>
        </div>
        <br />
        <Numbers selectedNumbers={this.state.selectedNumbers}/>
    	</div>
    )
  }
}


class App extends React.Component{
	render(){
  	return(
    	<div>
        <Game />
    	</div>
    )
  }
}

ReactDOM.render(<App />, mountNode);