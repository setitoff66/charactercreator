import React, {Component} from 'react';
import {Link, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import New from './Components/New';
// import Review from './Components/Review';
import Edit from './Components/Edit';

//App function
class App extends Component {
  constructor(props) {
    //creates object state property
    super(props);
    this.state = {
      charType: [
        // {name: 'Warrior', pop: 0},
        // {name: 'Siren', pop: 0},
        // {name: 'Berserker', pop: 0},
        // {name: 'Demolitionist', pop: 0},
        // {name: 'Sniper', pop: 0},
      ],
    };
  }

  add(i) {
    console.log('Character added', i);
    let c = [...this.state.charType];
    c[i].push++;
    this.setState({charType: c});
  }

  render() {
    return (
      <BrowserRouter>
        <>
          <div className="banner">
            <h1>Borderlands Character Creator</h1>
          </div>
          <div className="nav">
            <div className="container">
              <Link to="/">Home</Link>
              <Link to="/new">Create Character</Link>
            </div>
          </div>
          <div className="container">
            <Route exact path="/" component={Home} />
            <hr />
            <Route path="/new" component={New} />
            {/* <Route path="/review/:_id" component={Review} /> */}
            <Route path="/edit/:_id" component={Edit} />
          </div>
        </>
      </BrowserRouter>
    );
  }
}

export default App;
