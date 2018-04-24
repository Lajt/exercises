// https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents
// repl used: https://jscomplete.com/repl/

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const DoneFrame = (props) => {

  return (
    <div className="text-center">
      <h3>
      {props.doneStatus}
      </h3>
      <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
    </div>
  )
}

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
        <button className="btn btn-success"
                onClick={props.acceptAnswer}>
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
      button = 
        <button className="btn"
                onClick={props.checkAnswer}
                disabled={props.selectedNumbers.length === 0}>
        =
        </button>;
      break;
  }

  return (
    <div className="col-2 text-center">
      {button}
      <br />
      <br />
      <button className="btn btn-danger btn-sm" 
              onClick={props.redraw}
              disabled={props.redraws <= 0}>
        <i className="fa fa-refresh"></i>{props.redraws}
      </button>
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
      if(props.usedNumbers.indexOf(num) >= 0)
      return "used"
  } 

  return(
    <div className="card text-center">
      <div>
        {Numbers.list.map((number, i) => 
            <span key={i} className={numberClassName(number)} 
                  onClick={() => props.selectNumber(number)}>
              {number}
            </span>
          )}
      </div>
    </div>
  )
}

// do that when variable is shared with all instances of component and not related to any logic inside component
Numbers.list = _.range(1,10);

class Game extends React.Component{
  static randomNumber = () => 1 + Math.floor(Math.random()*9);
  static initialState = () => ({
    selectedNumbers: [],
    numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: ''
  });
  state = Game.initialState();

  selectNumber = (num) => {
    if(this.state.selectedNumbers.indexOf(num) >= 0)
      return;
    if(this.state.usedNumbers.indexOf(num) >= 0)
      return;
    this.setState((prev) => ({
      answerIsCorrect: null,
      selectedNumbers: prev.selectedNumbers.concat(num)
    }))
  }
  unselectNumber = (num) => {
    this.setState((prev) => ({
      answerIsCorrect: null,
      selectedNumbers: prev.selectedNumbers.filter((e) => e !== num)
    }))
  }
  checkAnswer = () => {
    // TODO: game status?
    this.setState((prev) => ({
      answerIsCorrect: prev.numberOfStars === prev.selectedNumbers.reduce((acc, num) => acc+num, 0)
    }))
  }
  acceptAnswer = () => {
    this.setState((prev) =>({
      usedNumbers: prev.usedNumbers.concat(prev.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: Game.randomNumber()
    }), this.updateDoneStatus)
  }
  redraw = () => {
    if(this.state.redraws <= 0)
      return;
    this.setState((prev) => ({
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      selectedNumbers: [],
      redraws: prev.redraws - 1
    }), this.updateDoneStatus)
  }
  possibleSoluton = ({numberOfStars, usedNumbers}) => {
    const possibleNumbers = _.range(1, 10).filter((num) =>
      usedNumbers.indexOf(num) === -1
    )
    return possibleCombinationSum(possibleNumbers, numberOfStars);
  }
  updateDoneStatus = () => {
    this.setState((prev) => {
      if(prev.usedNumbers.length === 9)
        return {doneStatus: 'Done! Good Job!'}
      if(prev.redraws <= 0 && !this.possibleSoluton(prev))
        return {doneStatus: 'Game Over!'}
    })
  }
  resetGame = () => {
    this.setState(Game.initialState())
  }

	render(){
    const {
      selectedNumbers, 
      numberOfStars, 
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus
    } = this.state;

  	return(
    	<div className="container">
    	  <h3>PlayNine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars}/>
          <Button selectedNumbers={selectedNumbers}
                  checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  redraw={this.redraw}
                  redraws={redraws}/>
          <Answer selectedNumbers={selectedNumbers} 
                  unselectNumber={this.unselectNumber}/>
        </div>
        <br />
        {doneStatus ? 
          <DoneFrame doneStatus={doneStatus} 
                     resetGame={this.resetGame} /> : 
          <Numbers selectedNumbers={selectedNumbers} 
          selectNumber={this.selectNumber}
          usedNumbers={usedNumbers}/>}
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