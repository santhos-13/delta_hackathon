const mongoose = require("mongoose");


const todos = new mongoose.Schema(
    {
      
      todo: {type:Array, unique:false},
      
      
        
    },
    { collection: "todos" }
  );
  
  const model = mongoose.model("todos", todos);
  module.exports = model;
  