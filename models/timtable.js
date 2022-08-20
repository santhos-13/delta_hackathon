const mongoose = require("mongoose");


const timetable = new mongoose.Schema(
    {
      
      lecture: {type:Array},
      lecturetime:{type: Array}
      
        
    },
    { collection: "timetable" }
  );
  
  const model = mongoose.model("timetable", timetable);
  module.exports = model;
  