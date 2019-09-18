require('dotenv').config()
const express = require('express');
const http = require('http');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const graphQlHttp = require('express-graphql');
// const { buildSchema } = require('graphql');


// connects our back end code with the database
const MONGO_URL = process.env.MONGO_HOST || "mongodb://localhost/eznyu";
console.log(MONGO_URL);
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"));

// import models
require('./models/coursedb');
require('./models/postdb');
require('./models/professordb');
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

//Setting api for the graphql

// app.use('/graphql', graphQlHttp({
//   schema: buildSchema(`
//     type Professor {
//       _id: ID!
//       name: String!
//       rating: Float
//       courses: [Course]
//     }

//     type Course {
//       _id: ID!
//       name: String!
//       courseID: String!
//       profesoor: Professor
//     }

//     type RootQuery{
//       professor: [Professor]
//       course: [Course]
//     }

//     type RootMutation{
//       createProfessor(name: String!, _id: ID!): String 
//       create
//     }

//     schema {
//       query: RootQuery
//       mutation: RootMutation
//     }

//     schema {
      
//     }
//   `),
//   rootValue: {
//     professor: () => {
//       return ['Joe', 'Sam', 'Bob'];
//     },
//     createProfessor: (args) => {
//       const profName = args.name;
//       return profName;
//     }
//   },
//   graphiql: true
// }));

//APIs for PROFESSORS
app.get('/api/professor/load', function(req, res){
  Professor.find({}, (err, data) => {
    if (err) {
      res.json('Professor Data could not be found');
      throw err;
    } else {
      console.log("prof data sent");
      res.json(data);
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
      res.json('Professor could not be added');
      throw err;
    }
    console.log("Professor inserted:", data.name);
    res.json(data);
  });
});

app.delete('/api/professor/delete', function (req, res) {
  console.log('Professor Delete: ', req.body.id)
  Professor.deleteOne({ _id: req.body.id }, function (err) {
    if (err) res.json("error");
    res.json("success");
  });
});

// APIs for COURSES
app.get('/api/course/load', function(req, res){
  Course.find({}, (err, data) => {
    if (err) {
      res.json('Course Data could not be found');
      throw err;
    } else {
      console.log("course data sent");
      res.json(data);
    }
  });
});

app.post('/api/course/add', function(req, res){
  console.log('Course Added: ', req.body)
  const newCourse = new Course({
    courseName: req.body.name,
    courseId: req.body.code,
    description: req.body.description
  });
  newCourse.save(function (err, course, count) {
    if (err) {
      res.json('Course could not be added');
      throw err;
    } else {
      console.log("course added:", course);
      res.json(course);
    }
  });
});

app.delete('/api/course/delete', function(req, res) {
  console.log('Course Delete: ', req.body.id);
  Course.deleteOne({ _id: req.body.id }, function (err) {
    if (err) res.json("error");
    res.json("success");
  });
});

// APIs for Professor Posts

app.get('/api/post/load', function(req, res){
  Post.find({}, (err, data) => {
    if (err) {
      res.json('Course Data could not be found');
      throw err;
    } else {
      console.log("course data sent");
      res.json(data);
    }
  });
});

app.post('/api/post/add', function(req, res) {
  console.log('Post Added: ', req.body)
  const newPost = new Post({
    name        : req.body.name,
    professorId : req.body.professorId,
    courseId    : req.body.code,
    description : req.body.description
  });
  newPost.save(function (err, post, count) {
    if (err) {
      res.json('Post could not be added');
      throw err;
    } else {
      console.log("Post added:", post);
      res.json(post);
    }
  });
});

server.listen(listenPort, () => console.log(`Listening on port ${port}`))
