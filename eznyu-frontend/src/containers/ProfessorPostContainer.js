import React from "react";
import Post from "./PostContainer";
require('dotenv').config()

class ProfessorPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      post: [],
      courses: [],
      id: ""
    }
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentDidMount() {
    fetch('/api/professor/find', {method: "GET" , }, )
      .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(response => {
      if (this._isMounted) {
        this.setState({ professors : response })
      }
    });
  }

  render(){
    console.log(this.props.match.params)
    return (
        <div style={{textAlign : "center"}}>
            <h1>{this.state.name}</h1>
            <Post
              profId = {this.state.id}
            />
        </div>
    )
  }
}
export default ProfessorPost;