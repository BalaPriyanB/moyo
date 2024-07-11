import express from "express";
const router = express.Router();
import {
  createPostTagy,
  deletePostTagy,
  getAllPostTags,
  updatePostTagy,
  getSingleTagy,
} from "../controllers/postTagsController";
import { adminGuard, authGuard } from "../middleware/authMiddleware";

router
  .route("/")
  .post(authGuard, adminGuard, createPostTagy)
  .get(getAllPostTags);

router
  .route("/:postTagyId")
  .get(getSingleTagy)
  .put(authGuard, adminGuard, updatePostTagy)
  .delete(authGuard, adminGuard, deletePostTagy);

export default router;
