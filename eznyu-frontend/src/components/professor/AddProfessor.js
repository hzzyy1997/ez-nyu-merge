import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class AddProfessor extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.send = this.send.bind(this);

    this.state = {
      name: "",
      showModal: false
    };
  }

  handleClose() {
    this.setState({ showModal: false });
    this.setState({ name: "" });
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value });
  }

  send() {
    this.props.sendAddProf(this.state.name);
    this.setState({ name: "" });
  }



  render() {
    const disableAdd = this.state.name.length > 20 || this.state.name.length === 0;
    const errorMsg = disableAdd ? "Name must be at least 5 characters and less than 20 characters" : ""
    return (
      <div id='add-prof-div' style={{ textAlign: "center" }}>
        <Button variant="primary" style={{fontSize : '30px'}} onClick={this.handleShow}>
          Add a Professor
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Professor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label>
              Professor Name:
              <input type="text" value={this.state.name} onChange={this.handleChange} />
            </label>
          </Modal.Body>
          <Modal.Footer>
            <p style={{ color: "red" }}>{errorMsg}</p>
            <Button variant="primary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(evt) => { this.send(); this.handleClose()}} disabled={disableAdd}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default AddProfessor;