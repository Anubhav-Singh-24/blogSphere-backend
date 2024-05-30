import Post from "../models/post.js";
import Comment from "../models/comment.js"
import { gfs } from "./image-controller.js";

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();

    response.status(200).json({msg:"Blog Posted!!"});
  } catch (error) {
    response.status(500).json(error);
  }
};

export const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).json({ msg: "Post not found" });
    }

    if(post.picture && request.body.picture !== post.picture){
        await gfs.files.deleteMany({filename:post.picture.split("/")[4]})
    }
    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json({msg:"Blog updated successfully!!"});
  } catch (error) {
    response.status(500).json(error);
  }
};

export const deletePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);
    if(post.picture){
      await gfs.files.deleteMany({ filename: post.picture.split("/")[4] });
    }
    await Comment.deleteMany({postId:post._id})
    await post.delete();

    response.status(200).json({msg:"Blog deleted successfully!!"});
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getAllUserPosts = async (request, response) => {
  try {
    const posts = await Post.find({username:request.user.email});
    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
}
};

export const getAllPosts = async(request,response)=>{
    try {
        const post = await Post.find({});
        response.status(200).json(post);
    } catch (error) {
        response.status(500).json(error);
    }
}

export const changeViews = async(request,response)=>{
  try {
    const post = await Post.findById(request.params.id);
    post.views = post.views+1;
    post.save();
    response.status(200).json({msg:"updated views"})
  } catch (error) {
    response.status(500).json(error)
  }
}
