import express from "express";
import CommentCtrl from "../controllers/CommentCtrl";
import { auth, isEditor, isAdmin, isRoot } from "../middleware/auth";

const router = express.Router();

router.get("/comment/article/:id", CommentCtrl.getComments);

router.patch("/comment/restore/:id", auth, isAdmin, CommentCtrl.restore);
router.patch("/comment/restore", auth, isAdmin, CommentCtrl.restoreMany);

router
  .route("/comment/:id")
  .get(CommentCtrl.findById)
  .put(auth, isEditor, CommentCtrl.update)
  .patch(auth, isAdmin, CommentCtrl.delete)
  .delete(auth, isRoot, CommentCtrl.destroy);

router
  .route("/comment")
  .get(auth, CommentCtrl.find)
  .post(auth, CommentCtrl.create)
  .patch(auth, isAdmin, CommentCtrl.deleteMany)
  .delete(auth, isAdmin, CommentCtrl.destroyMany);

export default router;
