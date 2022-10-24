import express from "express";
import CommentCtrl from "../controllers/CommentCtrl";
import { auth, isEditor, isAdmin, isRoot } from "../middleware/auth";

const router = express.Router();

router.post("/comment/create", auth, isEditor, CommentCtrl.create);

router.get("/comment/trash", CommentCtrl.trash);
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
  .get(CommentCtrl.find)
  .patch(auth, isAdmin, CommentCtrl.deleteMany)
  .delete(auth, isAdmin, CommentCtrl.destroyMany);

export default router;
