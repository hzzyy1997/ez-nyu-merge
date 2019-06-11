import React, { Component } from "react";
import ShowCourse from "../components/course/ShowCourse";
import AddCourse from '../components/course/AddCourse'
require('dotenv').config()

class CourseContainer extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      courses: [],
      deletedId: undefined
    };
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentDidMount() {
    fetch('/api/course/load', {method: "GET"})
      .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(response => {
      if (this._isMounted) {
        this.setState({ courses : response })
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sendAddCourse(name, code, description) {
    console.log("socket send")
    fetch('/api/course/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        code: code,
        description: description
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network Error at /api/course/add');
        }
      })
      .then(response => {
        const newCourses = Array.from(this.state.courses);
        newCourses.push(response);
        if (this.state.courses !== newCourses) {
          this.setState({ courses: newCourses })
        }
      });
  }

  deleteCourse(id) {
    this.setState({
      deletedId: id
    }, () => { 
      fetch('/api/course/delete', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network Error at /api/course/delete');
          }
        })
        .then(response => {
          console.log(response);
          if (response === "success") {
            const newCourses = this.state.courses.filter(course => course._id !== this.state.deletedId);
            if (this.state.courses !== newCourses) {
              this.setState({ courses: newCourses });
            }
          }
        });
    });
  }

  render() {
    return (
      <div>
        <ShowCourse
          courses={this.state.courses}
          deleteCourse={this.deleteCourse.bind(this)}
        />
        <AddCourse
          sendAddCourse={this.sendAddCourse.bind(this)}
        />
      </div>
    )
  }
}

export default CourseContainer;