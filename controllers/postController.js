import { postModel } from "../models/postModel.js";

export const createPost = async (req, res) => {
  const { title, body, slug, description } = req.body;

  const imageFile = req.file;

  if (!title || !body || !slug || !description) {
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
      image: imageName,
      body,
      slug,
      description,
    });
    await newPost.save();
    res
      .status(200)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {}
};
