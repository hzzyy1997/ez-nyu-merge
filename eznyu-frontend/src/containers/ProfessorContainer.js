import React, { Component } from "react";
import ShowProfessor from "../components/professor/ShowProfessor";
import AddProfessor from '../components/professor/AddProfessor'

class ProfessorContainer extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      professors: [],
      deletedId: undefined
    };
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentDidMount() {
    fetch('/api/professor/load', {method: "GET"})
      .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(response => {
      if (this._isMounted) {
        console.log(response)
        this.setState({ professors : response })
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sendAddProf(name) {
    fetch('/api/professor/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: name,
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(response => {
        console.log(response)
        const newProfs = Array.from(this.state.professors);
        newProfs.push();
        if (this.state.professors !== newProfs) {
          this.setState({ professors: newProfs })
        }
      });
  }

  // deleteProf(id) {
  //   this.setState({ 
  //     deletedId : id
  //   }, () => {    
  //     socket.emit('delete prof', id);
  //   })
  // }

  // recieveDeleteProf() {
  //   socket.on("delete prof", (data) => {
  //     if (data === "sucess") {
  //       const newProfs = this.state.professors.filter(prof => prof._id !== this.state.deletedId);
  //       this.setState({ professors : newProfs})
  //     }
  //   });
  // }

  render() {
    return (
        <div>
          <ShowProfessor 
            professors = {this.state.professors}
            // deleteProf = {this.deleteProf.bind(this)}
          />
          <AddProfessor 
            sendAddProf = {this.sendAddProf.bind(this)}
          />
        </div>
    )
  }
}

export default ProfessorContainer;