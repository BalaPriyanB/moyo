import PostTags from "../models/PostTags";
import Post from "../models/Post";

const createPostTagy = async (req, res, next) => {
  try {
    const { title } = req.body;

    const postTagy = await PostTags.findOne({ title });

    if (postTagy) {
      const error = new Error("Tagy is already created!");
      return next(error);
    }

    const newPostTagy = new PostTags({
      title,
    });

    const savedPostTagy = await newPostTagy.save();

    return res.status(201).json(savedPostTagy);
  } catch (error) {
    next(error);
  }
};

const getSingleTagy = async (req, res, next) => {
  try {
    const postTagy = await PostTags.findById(
      req.params.postTagyId
    );

    if (!postTagy) {
      const error = new Error("Tagy was not found!");
      return next(error);
    }

    return res.json(postTagy);
  } catch (error) {
    next(error);
  }
};

const getAllPostTags = async (req, res, next) => {
  try {
    const filter = req.query.searchKeyword;
    let where = {};
    if (filter) {
      where.title = { $regex: filter, $options: "i" };
    }
    let query = PostTags.find(where);
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await PostTags.find(where).countDocuments();
    const pages = Math.ceil(total / pageSize);

    res.header({
      "x-filter": filter,
      "x-totalcount": JSON.stringify(total),
      "x-currentpage": JSON.stringify(page),
      "x-pagesize": JSON.stringify(pageSize),
      "x-totalpagecount": JSON.stringify(pages),
    });

    if (page > pages) {
      return res.json([]);
    }

    const result = await query
      .skip(skip)
      .limit(pageSize)
      .sort({ updatedAt: "desc" });

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const updatePostTagy = async (req, res, next) => {
  try {
    const { title } = req.body;

    const postTagy = await PostTags.findByIdAndUpdate(
      req.params.postTagyId,
      {
        title,
      },
      {
        new: true,
      }
    );

    if (!postTagy) {
      const error = new Error("Tagy was not found");
      return next(error);
    }

    return res.json(postTagy);
  } catch (error) {
    next(error);
  }
};

const deletePostTagy = async (req, res, next) => {
  try {
    const TagyId = req.params.postTagyId;

    await Post.updateMany(
      { Tags: { $in: [TagyId] } },
      { $pull: { Tags: TagyId } }
    );

    await PostTags.deleteOne({ _id: TagyId });

    res.send({
      message: "Post Tagy is successfully deleted!",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createPostTagy,
  getAllPostTags,
  updatePostTagy,
  deletePostTagy,
  getSingleTagy,
};
