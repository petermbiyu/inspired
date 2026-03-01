import { postModel } from "../models/postModel.js";
import { deleteFile } from "../utlities/imageCleanUp.js";
import { message } from "./contactController.js";

export const createPost = async (req, res) => {
  const { title, body, snippet, topic, slug, description } = req.body;

  const imageFile = req.file;

  if (!title || !body || !snippet || !topic || !slug || !description) {
    if (imageFile) {
      await deleteFile(imageFile.filename);
    }
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  if (!imageFile) {
    return res.status(400).json({
      success: false,
      message: "Image is required",
    });
  }
  const titleExist = await postModel.findOne({ title });
  if (titleExist) {
    await deleteFile(imageFile.filename);
    return res
      .status(400)
      .json({ success: false, message: "Similar title exist" });
  }
  const slugExist = await postModel.findOne({ slug });
  if (slugExist) {
    await deleteFile(imageFile.filename);
    return res
      .status(400)
      .json({ success: false, message: "slug already exists" });
  }

  try {
    const newPost = new postModel({
      title,
      body,
      snippet,
      topic,
      image: imageFile.filename,
      slug,
      description,
    });
    await newPost.save();
    res
      .status(200)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {}
};

export const viewPost = async (req, res) => {
  try {
    const { topic } = req.params;
    let filter = {};
    if (topic) {
      filter.topic = { $regex: new RegExp(`^${topic}$`, "i") };
    }

    const posts = await postModel.find(filter).sort({ createdAt: -1 });

    if (!posts || posts.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: " No posts to display" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const { id, title, body, snippet, slug, description } = req.body;
  const newImage = req.file;

  try {
    const post = await postModel.findById(id);

    if (!post) {
      if (newImage) {
        await deleteFile(newImage.filename);
        return res
          .status(400)
          .json({ success: false, message: "Post not found" });
      }
    }

    if (!title || !body || !snippet || !slug || !description) {
      if (newImage) {
        await deleteFile(newImage.filename);
      }

      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const postByTitle = await postModel.findOne({ title, _id: { $ne: id } });
    if (postByTitle) {
      if (newImage) {
        await deleteFile(newImage.filename);
      }
      return res
        .status(400)
        .json({ success: false, message: "Post with similar title exists" });
    }

    const postBySlug = await postModel.findOne({ slug, _id: { $ne: id } });
    if (postBySlug) {
      if (newImage) {
        await deleteFile(newImage.filename);
      }
      return res
        .status(400)
        .json({ success: false, message: "Post with similar slug exists" });
    }

    if (newImage) {
      if (post.image) {
        await deleteFile(post.image);
      }
    }

    post.title = title;
    post.body = body;
    post.snippet = snippet;
    post.slug = slug;
    post.description = description;

    if (newImage) {
      if (post.image) {
        await deleteFile(post.image);
      }
      post.image = newImage.filename;
    }

    await post.save();

    res
      .status(200)
      .json({ success: true, message: "post updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const viewSinglePost = async (req, res) => {
  const { slug } = req.params;

  try {
    const post = await postModel.findOne({ slug });
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, post });
  } catch (error) {
    res.status(500).json({ success: false, message: "Post not found" });
  }
};
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ success: false, message: "No id found.." });
    }
    const post = await postModel.findById(id);
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post with such id not found.." });
    }

    if (post.image) {
      await deleteFile(post.image);
    }

    await postModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting post" });
  }
};
