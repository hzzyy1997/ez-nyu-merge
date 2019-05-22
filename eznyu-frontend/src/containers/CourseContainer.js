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
    // socket.emit("load course");
    // socket.on("load course", (data) => {
    //   if (this._isMounted) {
    //     this.setState({ courses: data })
    //   }
    // });
    // this.recieveAddCourse();
    // this.recieveDeleteCourse();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sendAddCourse(name, code, description) {
    console.log("socket send")
    // socket.emit('add course', name, code, description);
  }

  recieveAddCourse() {
    // socket.on("add course", (data) => {
    //   const newCourses = Array.from(this.state.courses)
    //   newCourses.push(data);
    //   if (this.state.courses !== newCourses) {
    //     this.setState({ courses: newCourses })
    //   }
    // });
  }

  deleteCourse(id) {
    this.setState({
      deletedId: id
    }, () => { 
      //socket.emit('delete course', id);
    })
  }

  recieveDeleteCourse() {
    // socket.on("delete course", (data) => {
    //   if (data === "sucess") {
    //     const newCourses = this.state.courses.filter(course => course._id !== this.state.deletedId);
    //     this.setState({ courses: newCourses })
    //   }
    // });
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