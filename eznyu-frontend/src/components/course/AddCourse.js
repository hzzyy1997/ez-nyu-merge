 import React, { Component } from "react";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      code: "",
      description: ""
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  handleCodeChange = (event) => {
    this.setState({
      code: event.target.value
    })
  }

  handleDiscriptionChange = (event) => {
    this.setState({
      description: event.target.value
    });
  }

  send() {
    this.props.sendAddCourse(this.state.name, this.state.code, this.state.description);
  }

  render() {
    const nameReq = this.state.name.length < 1 || this.state.name.length > 30;
    const codeReq = this.state.code.length < 1 || this.state.code.length > 15;
    const descriptionReq = this.state.description.length < 1 || this.state.description.length > 2000;
    console.log(this.state.description.length)
    const nameError = !nameReq ? "" : "Course Name must be at least 1 characters and no more then 30 chracters"
    const codeError = !codeReq ? "" : "Course Code must be at least 1 characters and no more then 30 chracters"
    const descriptionError = !descriptionReq ? "" : "Course Description must be at least 1 characters and no more then 2000 chracters"
    return (
      <div id='add-course-div' style={{ textAlign: "center" }}>
        <h1>Add a Course</h1>
        <label>
          Course Name:
              <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        </label>
        <br />
        <br />
        <label>
          Course Code:
              <input type="text" value={this.state.code} onChange={this.handleCodeChange.bind(this)} />
        </label>
        <br />
        <br />
        <label style={{ display: "block" }}>
          Course Description:
        </label>
        <textarea type="text"
          value={this.state.description}
          onChange={this.handleDiscriptionChange.bind(this)}
          style={{ height: "200px", width: "600px", display: "inline", float: "center" }}
        />
        <br />
        <br />
        <button onClick={
          this.send.bind(this)}
          disabled={nameReq || codeReq || descriptionReq}
        >Add Course</button>
        <p style={{ color: "red", textAlign: "center" }}>{nameError}</p>
        <p style={{ color: "red", textAlign: "center" }}>{codeError}</p>
        <p style={{ color: "red", textAlign: "center" }}>{descriptionError}</p>
      </div>
    )
  }
}

export default AddCourse;