import React from "react";

class Course extends React.Component {
  delete() {
    this.props.deleteCourse(this.props.id);
  }

  render(){
    return (
      <div id={this.props.id} className="course" style={{ textAlign: "center" }}>
        <div style={{ backgroundColor: "linen", width: "500px", display: "inline-block" }}>
          <p>Course name : {this.props.name}</p>
          <p>Course Id : {this.props.code}</p>
          <p>Course Description : {this.props.description}</p>
        </div>
        <div>
          <button className="delete-btn" onClick={this.delete.bind(this)} style={{ display: "inline-block"}}> delete </button>
          <button style={{ display: "inline" }}> Link Course to Professor </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default Course;