import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import CourseContainer from './containers/CourseContainer';
import ProfessorContainer from './containers/ProfessorContainer';
import Home from './components/HomePage'
import ProfessorPost from './containers/ProfessorPostContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <Link to='/' className="btn-left">
          Home
        </Link>
        <Link to='/professor' className="btn-left">
          Professors
        </Link>
        <Link to='/course' className="btn-left">
          Courses
        </Link>
        <hr/>

        <Route exact path='/' component = {Home} />
        <Route exact path='/professor' component = {ProfessorContainer} />
        <Route exact path='/course' component = {CourseContainer} />
        <Route exact path='/professor/:profid' component = {ProfessorPost} />
        {/* <Route exact path='/professor/:profid/:courseid' component = {ProfessorCoursePost} /> */}
      </Router>
    )
  }
}

export default App;