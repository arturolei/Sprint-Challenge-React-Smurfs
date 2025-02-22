import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }

  addSmurf = event => {
    event.preventDefault();
    // add code to create the smurf using the api
    let smurf = {
      name: this.state.name,
      age: parseInt(this.state.age, 10),
      height: parseInt(this.state.height,10) 
    }
    //POST request
    axios
      .post("http://localhost:3333/smurfs", smurf)
      .then(response => {
          console.log( "POST Request Successful; here are smurfs",response.data);
          //this.props.updateSmurfList();
          this.props.registerStateChange(response.data);
        })
      .catch(error => console.log(error));

    

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  
  }


  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">Add to the village</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
