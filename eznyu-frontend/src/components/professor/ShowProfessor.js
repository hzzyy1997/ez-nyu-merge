import React, { Component } from "react";
import Professor from './Professor'

class ShowProfessor extends Component {
  render() {
    return (
      <div id="show-prof-div" style={{ textAlign: "center" }}>
        <h1>Professors in the Database:</h1>
        {this.props.professors.map((prof, i) => (
            <Professor
              key={prof._id}
              id={prof._id}
              name={prof.name}
              deleteProf={this.props.deleteProf}
            >
            </Professor>
        ))}
      </div>
    )
  }
}

export default ShowProfessor;