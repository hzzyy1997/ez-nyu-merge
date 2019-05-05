import React from "react";

class Post extends React.Component {
  delete() {
    this.props.deletePost(this.props.id);
  }

  render(){
    return (
      <div id={this.props.id} className="post" style={{ textAlign: "center" }}>
        <div style={{ backgroundColor: "linen", width: "500px", display: "inline-block" }}>
          <p>Review: {this.props.message}</p>
          <p style={{fontSize : "10px"}}>Created by: {this.props.name}</p>
        </div>
        <div>
          <button className="delete-btn" onClick={this.delete.bind(this)} style={{ display: "inline-block"}}> delete </button>
        </div>
        <br />
        <br />
        <br />
      </div>
    )
  }
}

export default Post;