const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProfessorSchema = require('./professordb').schema
const PostSchema = require('./postdb').schema

const CourseSchema = new Schema(
  {
    courseId    : String,
    courseName  : String,
    professor   : Schema.Types.ObjectId,
    description : String
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Course", CourseSchema);