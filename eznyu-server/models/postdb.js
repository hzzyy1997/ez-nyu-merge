const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = require('./coursedb')
const ProfessorSchema = require('./professordb')

const PostSchema = new Schema(
  {
    professorId : Schema.Types.ObjectId,
    courseId    : Schema.Types.ObjectId,
    description : String,
    name        : String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);