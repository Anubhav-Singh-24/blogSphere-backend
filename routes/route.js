import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllUserPosts,
  getAllPosts,
  changeViews
} from "../controllers/post-controller.js";
import { uploadImage, getImage } from "../controllers/image-controller.js";
import {
  newComment,
  getComments,
  deleteComment,
} from "../controllers/comment-controller.js";
import {
  loginUser,
  singupUser,
} from "../controllers/user-controller.js";
import {
  authenticateToken,
} from "../controllers/jwt-controller.js";

import upload from "../utils/upload.js";
import { deleteImage } from "../controllers/image-controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", singupUser);


router.post("/create", authenticateToken, createPost);
router.put("/update/:id", authenticateToken, updatePost);
router.delete("/delete/:id", authenticateToken, deletePost);
router.get("/post/:id", getPost);
router.get("/post/views/:id",changeViews)
router.get("/posts", authenticateToken, getAllUserPosts);
router.get("/allposts",getAllPosts)

router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
router.delete("/file/delete/:filename",deleteImage)

router.post("/comment/new", authenticateToken, newComment);
router.get("/comments/:id", getComments);
router.delete("/comment/delete/:id", authenticateToken, deleteComment);

export default router;
