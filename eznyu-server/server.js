require('dotenv').config()
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// connects our back end code with the database
const MONGO_URL = process.env.MONGO_HOST || "mongodb://localhost/eznyu";
console.log(MONGO_URL);
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));
// import professor model

require('./database/coursedb');
require('./database/postdb');
require('./database/professordb');
const Course = mongoose.model('Course')
const Post = mongoose.model('Post')
const Professor = mongoose.model('Professor')

// our ports
const port = process.env.PORT || 4001;
let listenPort = port;

console.log(port);
const app = express();
// our server instance
const server = http.createServer(app)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));

// send the index.html file from the build folder to every route
// routing are handled by react-routes on the frontend
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/professor', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/course', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/professor/:id', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//setting api for the app

app.get('/api/professor/load', function(req, res){
  Professor.find({}, (err, data) => {
    if (err) {
      res.send('Professor Data could not be found');
      throw err;
    } else {
      console.log("prof data sent");
      res.send(data);
    }
  });
});

app.post('/api/professor/add', function(req, res){
  console.log('Professor Added: ', req.body.data)
  const newProf = new Professor({
    "name": req.body.data
  });
  newProf.save(function (err, data, count) {
    if (err) {
      res.send('Professor could not be added');
      throw err;
    }
    console.log("Professor inserted:", data.name);
    res.send(data.name);
  });
});



// io.on('connection', socket => {
//     //
//     //Sockets for Professors
//     //
//     console.log('New client connected')
//     socket.on('load prof', () => {
//       console.log('Load Professor Request');
//       Professor.find({}, (err, data) => {
//         if (err) {
//           io.emit("load prof", "error");
//         } else {
//           console.log("profs:", data);
//           io.emit("load prof", data);
//         }
//       });
//     });

//     socket.on('find prof', (id) => {
//       console.log('Find Professor Request');
//       Professor.find({_id : id}, (err, data) => {
//         if (err) {
//           io.emit("find prof", "error");
//         } else {
//           console.log("profs:", data);
//           io.emit("find prof", data);
//         }
//       });
//     });

//     socket.on('add prof', (name) => {
//       console.log('Professor Added: ', name)
//       const newProf = new Professor({
//         "name": name
//       });
//       newProf.save(function (err, prof, count) {
//         if (err) {
//           io.emit('add prof', "error")
//           throw err;
//         }
//         console.log("Professor inserted:", count, name);
//         io.emit('add prof', prof)
//      });
//     });

//     socket.on('delete prof', (id) => {
//       console.log('Professor deleted: ', id)
//       Professor.deleteOne( { _id: id } , function (err) {
//         if (err) return handleError(err);
//         io.emit('delete prof', 'sucess')
//       });
//     });

//     //
//     //Sockets for Courses
//     //

//     socket.on('load course', () => {
//       console.log('Load Course Request');
//       Course.find({}, (err, data) => {
//         if (err) {
//           io.emit("load course", "error");
//         } else {
//           console.log("courses:", data);
//           io.emit("load course", data);
//         }
//       });
//     });

//     socket.on('find course', (id) => {
//       console.log('Find Course Request');
//       Course.find({_id : id}, (err, data) => {
//         if (err) {
//           io.emit("find course", "error");
//         } else {
//           console.log("courses:", data);
//           io.emit("find course", data);
//         }
//       });
//     });

//     socket.on('add course', (name, code, description) => {
//       console.log('Course Added: ', name)
//       const newCourse = new Course({
//         courseName: name,
//         courseId: code,
//         description: description
//       });
//       newCourse.save(function (err, course, count) {
//         if (err) {
//           io.emit('add course', "error")
//           throw err;
//         }
//         console.log("Course inserted:", count, name);
//         io.emit('add course', course)
//      });
//     });

//     socket.on('delete course', (id) => {
//       console.log('Course deleted: ', id)
//       Course.deleteOne( { _id: id } , function (err) {
//         if (err) return handleError(err);
//         io.emit('delete course', 'sucess')
//       });
//     });

//     //
//     //Sockets for Posts
//     //

//     socket.on('load post', (id) => {
//       console.log('Load Post Request', id);
//       Post.find({}, (err, data) => {
//         if (err) {
//           io.emit("load post", "Error");
//         } else {
//           console.log("Posts:", data);
//           io.emit("load post", data);
//         }
//       });
//     });

//     socket.on('add post', (name, message) => {
//       console.log('Post Added: ', name, message)
//       const newPost = new Post({
//         "name": name,
//         "message": message
//       });
//       newPost.save(function (err, post, count) {
//         if (err) {throw err;}
//         console.log("Post inserted: ", count, message, " by: ", name);
//         io.emit('add post', post)
//      });
//     });

//     socket.on('delete post', (id) => {
//       console.log('Post deleted: ', id)
//       Post.deleteOne( { _id: id } , function (err) {
//         if (err) return handleError(err);
//         io.emit('delete post', 'sucess')
//       });
//     });

//     socket.on('disconnect', () => {
//       console.log('user disconnected')
//     });
//   })

server.listen(listenPort, () => console.log(`Listening on port ${port}`))
