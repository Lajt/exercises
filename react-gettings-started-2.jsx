// https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents
// repl used: https://jscomplete.com/repl/


class App extends React.Component{

  state = {
    cards: [
      { 
        name: 'Lajt',
        company: 'none',
        avatar: 'http://placehold.it/75x75'
      },
      { 
        name: 'Lajt2',
        company: 'none2',
        avatar: 'http://placehold.it/75x75'
      }
    ]
  }

	render(){
  	return(
    	<div>
        <Form fn={this.pusher}/>
      	<CardList cards={this.state.cards} />
    	</div>
    )
  }
}

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
  	  <img src={props.avatar}></img>
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
  	</div>
  )
}

const CardList = (props) => {
  return(
    <React.Fragment>
      {props.cards.map(card => <Card {...card}/>)}
    </React.Fragment>
  )
}

class Form extends React.Component{
  state = {userName: ''}

  handleSubmit = (event) => {
    event.preventDefault();
    //console.log(this.state.userName)
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        console.log(resp)
      })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
          value={this.state.username} 
          onChange={(event) => this.setState({userName: event.target.value}) }
          placeholder="Github username" required/>
          <button type="submit">Add card</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App />, mountNode);