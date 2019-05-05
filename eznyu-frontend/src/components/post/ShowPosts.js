import React, { Component } from "react";
import Post from './Post'

class ShowPost extends Component {
  render() {
    return (
      <div id="show-post-div" style={{ textAlign: "center" }}>
        <h1>Posts in the Database:</h1>
        {this.props.posts.map((post, i) => (
            <Post
              key={post._id}
              id={post._id}
              name={post.name}
              message={post.message}
              deletePost={this.props.deletePost}
            >
            </Post>
        ))}
      </div>
    )
  }
}

export default ShowPost;