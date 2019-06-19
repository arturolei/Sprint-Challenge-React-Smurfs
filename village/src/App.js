import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {Route, NavLink} from 'react-router-dom';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
      activeSmurf: null
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.

  //GET Request
  componentDidMount(){
    axios
      .get("http://localhost:3333/smurfs")
      .then(smurfInfo => this.setState({smurfs:smurfInfo.data}))
      .catch(err=> console.log("GET ERROR:", err));
  }
  
  //To be called if there is a state change
  updateSmurfList = event => {
    axios
    .get("http://localhost:3333/smurfs")
    .then(smurfInfo => this.setState({smurfs:smurfInfo.data}))
    .catch(err=> console.log("upadateSmurfList GET ERROR:", err));
  }

  /* Alternate Solution 
  registerStateChange was an alternate way of updating the Smurf List 

  */
 
  registerStateChange = responseData => {
    this.setState({smurfs:responseData});
  }


  deleteSmurf = id => {
    axios
    .delete(`http://localhost:3333/smurfs/${id}`)
    .then(response => {
        console.log("DELETE WORKED, here are smurfs:", response.data);
        this.updateSmurfList();
      })
    .catch(err => console.log("DELETE FAILED", err));
    //window.location.reload();
  }

  updateSmurf = (smurf)=> {
    axios
    .put(`http://localhost:3333/smurfs/${smurf.id}`, smurf)
    .then(response => {
      this.setState({
      activeSmurf: null,
      smurfs: response.data
      });
      this.updateSmurfList();
    })
    .catch(err => console.log("Updating Smurf PUT ERROR:", err));
  }

  setActiveSmurf = (smurf) =>{
    this.setState({activeSmurf:smurf})
  }


  render() {
    return (
      <div className="App">
          <div className="navbar">
            <NavLink to="/" activeClassName="activeNavButton">HOME</NavLink>
            <NavLink to="/smurf-form" activeClassName="activeNavButton">ADD SMURFS</NavLink>
          </div>
          <Route exact path ="/smurf-form" 
                render = {props => (<SmurfForm {...props} updateSmurfList={this.updateSmurfList} registerStateChange={this.registerStateChange}/>)
          }/>
          <Route path ="/" render={props =>  <Smurfs {...props} smurfs={this.state.smurfs} deleteSmurf={this.deleteSmurf} setActiveSmurf={this.setActiveSmurf}/>}/>
        
      </div>
    );
  }
}

export default App;
