// https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents
// repl used: https://jscomplete.com/repl/



const Stars = (props) => {
  //const numberOfStars = 1 + Math.floor(Math.random()*9);

  return (
    <div className="col-5">
      {
        _.range(props.numberOfStars).map((num, i) =>
        <i key={i} className="fa fa-star"></i>
      )
      }
    </div>
  )
}

const Button = (props) => {

  let button;
  switch(props.answerIsCorrect){
    case true:
      button = 
        <button className="btn btn-success">
          <i className="fa fa-check"></i>
        </button>;
      break;
    case false:
      button = 
          <button className="btn btn-danger">
            <i className="fa fa-times"></i>
          </button>;
      break;
    default:
      button = <button className="btn" disabled={props.selectedNumbers.length === 0}>=</button>;
      break;
  }

  return (
    <div className="col-2">
      {button}
    </div>
  )
}

const Answer = (props) => {

  return (
    <div className="col-5">
      {props.selectedNumbers.map((num, i) => 
        <span key={i} onClick={() => props.unselectNumber(num)}>{num}</span>
      )}
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
            <span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>{number}</span>
          )}
      </div>
    </div>
  )
}

// do that when variable is shared with all instances of component and not related to any logic inside component
Numbers.list = _.range(1,10);

class Game extends React.Component{
  state = {
    selectedNumbers: [2, 4],
    numberOfStars: 1 + Math.floor(Math.random()*9),
    answerIsCorrect: null
  }

  selectNumber = (num) => {
    if(this.state.selectedNumbers.indexOf(num) >= 0)
      return;

    this.setState((prev) => ({selectedNumbers: prev.selectedNumbers.concat(num)}))
  }

  unselectNumber = (num) => {

    this.setState((prev) => ({selectedNumbers: prev.selectedNumbers.filter((e) => e !== num)}))
  }

  checkAnswer = () => {

    this.setState((prev) => ({
      answerIsCorrect: prev.numberOfStars === prev.selectedNumbers.reduce((acc, num) => acc+num, 0)
    }))
  }

	render(){
    const {selectedNumbers, numberOfStars, answerIsCorrect} = this.state;

  	return(
    	<div className="container">
    	  <h3>PlayNine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars}/>
          <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}/>
          <Answer selectedNumbers={selectedNumbers} 
                  unselectNumber={this.unselectNumber}/>
        </div>
        <br />
        <Numbers selectedNumbers={selectedNumbers} 
                  selectNumber={this.selectNumber}/>
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