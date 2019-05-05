import React, { Component } from "react";
import Course from './Course'

class ShowCourse extends Component {
  render() {
    return (
      <div id="show-course-div" style={{ textAlign: "center" }}>
        <h1>Courses in the Database:</h1>
        {this.props.courses.map((course, i) => (
            <Course
              key={course._id}
              id={course._id}
              name={course.courseName}
              code={course.courseId}
              description={course.description}
              deleteCourse={this.props.deleteCourse}
            >
            </Course>
        ))}
      </div>
    )
  }
}

export default ShowCourse;