import React from "react";

class Professor extends React.Component {

  delete() {
    this.props.deleteProf(this.props.id);
  }

  render(){
    return (
      <div id={this.props.id} className="professor">
        <div>
          <a href={`/professor/${this.props.id}`}>{this.props.name}</a>
          <button className="delete-btn" onClick={this.delete.bind(this)}> Delete </button>
        </div>
      </div>
    )
  }
}

export default Professor;