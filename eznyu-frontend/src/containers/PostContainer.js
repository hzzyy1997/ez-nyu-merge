import React, { Component } from "react";
import ShowPost from "../components/post/ShowPosts";
import AddPost from '../components/post/AddPost';
import io from 'socket.io-client';
require('dotenv').config()
let socket = io();
if (process.env.ENVIRONMENT === "DEVELOPMENT") {
    socket = io('http://localhost:4001');
}

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
    console.log(socket)
    socket.emit("load post", this.props.id);
    socket.on("load post", (data) => {
      if (this._isMounted) {
        this.setState({ posts: data })
      }
    });
    this.recieveAddPost();
    this.recieveDeletePost();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  sendAddPost(name, message) {  
    console.log("socket send")
    socket.emit('add post', name, message);
  }

  recieveAddPost() {   
    socket.on("add post", (data) => {
      const newPosts = Array.from(this.state.posts)
      newPosts.push(data);
      if (this.state.posts !== newPosts) {
        this.setState({ posts: newPosts })
      }
    });
  }

  deletePost(id) {
    this.setState({
      deletedId: id
    }, () => { 
      socket.emit('delete post', id);
    })
  }

  recieveDeletePost() {
    socket.on("delete post", (data) => {
      if (data === "sucess") {
        const newPosts = this.state.posts.filter(post => post._id !== this.state.deletedId);
        this.setState({ posts: newPosts })
      }
    });
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