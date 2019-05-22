import React from "react";
import Post from "./PostContainer";
require('dotenv').config()

class ProfessorDetail extends React.Component {
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
    // socket.emit("find prof", this.props.match.params.profid);
    // socket.on("find prof", data => this.setState({ 
    //   name : data[0].name,
    //   posts : data[0].posts,
    //   courses : data[0].courses,
    //   id : data[0]._id
    // }));
  }



  getProf
  render(){
    console.log(this.state.name)

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
export default ProfessorDetail;