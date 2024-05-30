import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  publishDate: {
    type: Date,
  },
  name:{
    type:String,
    required:true,
  },
  views:{
    type:Number,
    required:true
  }
});

const post = mongoose.model("post", PostSchema);

export default post;
