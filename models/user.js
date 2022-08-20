const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    lecture: {type:Array},
    lecturetime:{type: Array}
    
      
  },
  { collection: "users" }
);

const model = mongoose.model("UserSchema", UserSchema);
module.exports = model;
