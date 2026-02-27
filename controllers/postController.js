import { postModel } from "../models/postModel.js";
import { deleteFile } from "../utlities/imageCleanUp.js";

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
    const { topic } = req.query;
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
