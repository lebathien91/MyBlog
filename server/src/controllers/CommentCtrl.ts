import { Response } from "express";
import { IReqAuth } from "../utils/interface";
import { featureAPI } from "../utils/features";
import Comments from "../models/commentModles";

const CommentCtrl = class {
  // Method: GET
  // Route: /comment/article/:id
  async getComments(req: IReqAuth, res: Response) {
    const articleId = req.params.id;
    try {
      const features = new featureAPI(
        Comments.find({ articleId, deleted: null }),
        req.query
      )
        .filtering()
        .searching()
        .populated()
        .sorting()
        .paginating();

      const counting = new featureAPI(
        Comments.find({ articleId, deleted: null }),
        req.query
      )
        .filtering()
        .searching()
        .counting();

      const results = await Promise.allSettled([
        features.query,
        counting.query,
      ]);

      const comments =
        results[0].status === "fulfilled" ? results[0].value : [];
      const count = results[1].status === "fulfilled" ? results[1].value : 0;

      res.json({ success: "Find Success", comments, count });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: POST
  // Route: /comment/create
  async create(req: IReqAuth, res: Response) {
    try {
      const newComment = new Comments({
        user: req.user._id,
        ...req.body,
      });

      await newComment.save();

      res.json({ success: "Create Comment Success" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: PUT
  // Route: /comment/:id
  async update(req: IReqAuth, res: Response) {
    const id = req.params.id;
    try {
      const comment = await Comments.findOneAndUpdate({ _id: id }, req.body);

      if (!comment) return res.status(400).json({ error: "Invalid Comment." });

      res.json({ success: "Update Success", comment });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: GET
  // Route: /comment
  async find(req: IReqAuth, res: Response) {
    try {
      const features = new featureAPI(
        Comments.find({ deleted: null }),
        req.query
      )
        .filtering()
        .searching()
        .populated()
        .sorting()
        .paginating();

      const counting = new featureAPI(
        Comments.find({ deleted: null }),
        req.query
      )
        .filtering()
        .searching()
        .counting();

      const results = await Promise.allSettled([
        features.query,
        counting.query,
      ]);

      const comments =
        results[0].status === "fulfilled" ? results[0].value : [];
      const count = results[1].status === "fulfilled" ? results[1].value : 0;

      res.json({ success: "Find Success", comments, count });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: GET
  // Route: /comment/trash
  async trash(req: IReqAuth, res: Response) {
    try {
      const features = new featureAPI(
        Comments.where("deleted").ne(null),
        req.query
      )
        .filtering()
        .populated()
        .searching()
        .sorting()
        .paginating();

      const counting = new featureAPI(
        Comments.where("deleted").ne(null),
        req.query
      )
        .searching()
        .counting();

      const results = await Promise.allSettled([
        features.query,
        counting.query,
      ]);

      const comments =
        results[0].status === "fulfilled" ? results[0].value : [];
      const count = results[1].status === "fulfilled" ? results[1].value : 0;

      res.json({ success: "Find Success", comments, count });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: GET
  // Route: /comment/:id
  async findById(req: IReqAuth, res: Response) {
    try {
      const populate = req.query.populate as string;

      const comment = await Comments.findById({
        _id: req.params.id,
        deleted: null,
      }).populate(populate);
      if (!comment) return res.status(400).json({ error: "Invalid Comment." });

      res.json({ success: "Find Comment Success", comment });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: PATCH
  // Route: /comment/:id
  async delete(req: IReqAuth, res: Response) {
    try {
      const { id } = req.params;
      const date = new Date();
      if (
        req.user?.role === "editor" ||
        req.user?.role === "admin" ||
        req.user.root
      ) {
        const comment = await Comments.findOneAndUpdate(
          { _id: id },
          { deleted: date }
        );
        if (!comment) return res.status(400).json({ error: "Invalid Comment" });

        res.json({ success: "Delete Comment Success" });
      } else {
        const comment = await Comments.findOneAndUpdate(
          { _id: id, user: req.user?._id },
          { deleted: date }
        );
        if (!comment) return res.status(400).json({ error: "Invalid Comment" });

        res.json({ success: "Delete Comment Success" });
      }
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: PATCH
  // Route: /comment
  async deleteMany(req: IReqAuth, res: Response) {
    try {
      const ids = req.body;
      const date = new Date();
      const comment = await Comments.updateMany(
        { _id: { $in: ids } },
        { deleted: date }
      );

      if (!comment) return res.status(400).json({ error: "Invalid Comment" });

      res.json({ success: "Delete Comment Success" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: PATCH
  // Route: /comment/restore/:id
  async restore(req: IReqAuth, res: Response) {
    try {
      const { id } = req.params;
      const comment = await Comments.findOneAndUpdate(
        { _id: id },
        { deleted: null }
      );

      if (!comment) return res.status(400).json({ error: "Invalid Comment" });

      res.json({ success: "Restore Comment Success" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: PATCH
  // Route: /comment
  async restoreMany(req: IReqAuth, res: Response) {
    try {
      const ids = req.body;
      const comment = await Comments.updateMany(
        { _id: { $in: ids } },
        { deleted: null }
      );

      if (!comment) return res.status(400).json({ error: "Invalid Comment" });

      res.json({ success: "Restore Comment Success" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: DELETE
  // Route: /comment/:id
  async destroy(req: IReqAuth, res: Response) {
    try {
      const { id } = req.params;

      const comment = await Comments.findByIdAndDelete({ _id: id });

      if (!comment) return res.status(400).json({ error: "Invalid Comment" });

      res.json({ success: "Delete Comment Success" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Method: DELETE
  // Route: /comment
  async destroyMany(req: IReqAuth, res: Response) {
    try {
      const ids = req.body;
      console.log(ids);
      const results = await Comments.deleteMany({ _id: { $in: ids } });

      if (!results) return res.status(400).json({ error: "Invalid Article" });

      res.json({ success: "Destroy Article Success" });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
};

export default new CommentCtrl();