import React, { Component } from "react";
import './ShowProfessor.css'

class AddProfessor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
  }
  
  handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  send() {
    this.setState({name: ""});
    this.props.sendAddProf(this.state.name);
  } 

  render() {
    const disableAdd = this.state.name.length > 20 || this.state.name.length === 0;
    const errorMsg = disableAdd ? "Name must be at least 5 characters and less than 20 characters" : ""
    return (
      <div id='add-prof-div' style={{ textAlign: "center" }}>
        <h1>Add a Professor</h1>
        <label>
          Professor Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
        </label>
        <button onClick={this.send.bind(this)} disabled={disableAdd}>Add Professor</button>
        <p style={{color : "red"}}>{errorMsg}</p>
      </div>
    )
  }
}

export default AddProfessor;