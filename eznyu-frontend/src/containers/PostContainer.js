import React, { Component } from "react";
import ShowPost from "../components/post/ShowPosts";
import AddPost from '../components/post/AddPost';
require('dotenv').config()

class PostContainer extends Component {
  constructor() {
    super();
    this._isMounted = false;
    this.state = {
      posts: [],
      deletedId: undefined
    };
  }

  componentWillMount() {
    this._isMounted = true;
  }

  componentDidMount() {
    fetch('/api/post/load', {method: "GET"})
      .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    }).then(response => {
      if (this._isMounted) {
        console.log(response)
        this.setState({ posts : response })
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sendAddPost(name, message) {  
    fetch('/api/post/add', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        message: message,
        
      })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .then(response => {
        console.log(response)
        const newPosts = Array.from(this.state.posts);
        newPosts.push();
        if (this.state.posts !== newPosts) {
          this.setState({ posts: newPosts })
        }
      });
  }

  deletePost(id) {
    this.setState({
      deletedId: id
    }, () => { 
      fetch('/api/post/delete', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: id,
        })
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Network response was not ok.');
          }
        })
        .then(response => {
          console.log(response)
          
        });
    })
  }

  recieveDeletePost() {
    // socket.on("delete post", (data) => {
    //   if (data === "sucess") {
    //     const newPosts = this.state.posts.filter(post => post._id !== this.state.deletedId);
    //     this.setState({ posts: newPosts })
    //   }
    // });
  }

  render() {
    return (
      <div>
        <ShowPost
          posts={this.state.posts}
          deletePost={this.deletePost.bind(this)}
        />
        <AddPost
          sendAddPost={this.sendAddPost.bind(this)}
        />
      </div>
    )
  }
}

export default PostContainer;