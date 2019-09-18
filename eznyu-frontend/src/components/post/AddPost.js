import React, { Component } from "react";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      message: ""
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  }

  handleMessageChange = (event) => {
    this.setState({
      message: event.target.value
    });
  }

  send() {
    this.props.sendAddPost(this.state.name, this.state.message);
    this.setState({ name : ""});
  }

  render() {
    const nameReq = this.state.name.length < 1 || this.state.name.length > 30;
    const messageReq = this.state.message.length < 1 || this.state.message.length > 2000;
    const nameError = !nameReq ? "" : "Creater Name must be at least 1 characters and no more then 30 chracters"
    const messageError = !messageReq ? "" : "Review must be at least 1 characters and no more then 2000 chracters"
    return (
      <div id='add-course-div' style={{ textAlign: "center" }}>
        <h1>Add a Post</h1>
        <label>      
        <label style={{ display: "block" }}>
          Review:
        </label>
        <textarea type="text"
          value={this.state.message}
          onChange={this.handleMessageChange.bind(this)}
          style={{ height: "200px", width: "600px", display: "inline", float: "center" }}
        />  
        <br />
        <br />
        Created by:
            <input type="text" value={this.state.name} onChange={this.handleNameChange.bind(this)} />
        </label>

        <br />
        <br />
        <button onClick={
          this.send.bind(this)}
          disabled={nameReq || messageReq}
        >Add Post</button>
        <p style={{ color: "red", textAlign: "center" }}>{nameError}</p>
        <p style={{ color: "red", textAlign: "center" }}>{messageError}</p>
      </div>
    )
  }
}

export default AddPost;