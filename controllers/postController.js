import { postModel } from "../models/postModel.js";

export const createPost = async (req, res) => {
  const { title, body, snippet, topic, slug, description } = req.body;

  const imageFile = req.file;

  if (!title || !body || !snippet || topic || !slug || !description) {
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

  const imageName = imageFile.filename;

  try {
    const newPost = new postModel({
      title,
      body,
      snippet,
      topic,
      image: imageName,
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
    const allPost = await postModel.find().sort({ createdAt: -1 });

    if (!allPost) {
      return res
        .status(400)
        .json({ success: false, message: " No posts to display" });
    }

    res.status(200).json({ success: true, count: allPost.length, allPost });
  } catch (error) {
    console.log("error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
