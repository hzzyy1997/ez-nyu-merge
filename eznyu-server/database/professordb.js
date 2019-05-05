const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = require('./coursedb').schema
const PostSchema = require('./postdb').schema
// this will be our data base's data structure 

const ProfessorSchema = new Schema(
  {
    name     : String,
    courses  : [Schema.Types.ObjectId],
    post     : [Schema.Types.ObjectId],
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Professor", ProfessorSchema);