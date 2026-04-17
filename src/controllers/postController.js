import { prisma } from "../config/DBConnect.js";
import { deleteFile } from "../utlities/imageCleanUp.js";

export const createPost = async (req, res) => {
  const { title, body, snippet, topic, slug, description, topicId } = req.body;

  const imageFile = req.file;
  const writerId = req.user.id;

  if (
    !title ||
    !body ||
    !snippet ||
    !topic ||
    !slug ||
    !description ||
    !topicId
  ) {
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
  // check for similar title
  const titleExist = await prisma.post.findUnique({ where: { title: title } });
  if (titleExist) {
    await deleteFile(imageFile.filename);
    return res
      .status(400)
      .json({ success: false, message: "Similar title exist" });
  }
  // check for similar slug
  const slugExist = await prisma.post.findUnique({ where: { slug: slug } });
  if (slugExist) {
    await deleteFile(imageFile.filename);
    return res
      .status(400)
      .json({ success: false, message: "slug already exists" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        body,
        snippet,
        topic,
        image: imageFile.filename,
        slug,
        description,
        topicId: parseInt(topicId),
        writerId,
      },
    });
    res.status(200).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    await deleteFile(imageFile.filename);
    res.status(500).json({ success: false, postErr: error.message });
  }
};

export const viewPost = async (req, res) => {
  try {
    const { topic } = req.params;

    const posts = await prisma.post.findMany({
      where: { topic: { topic: { equals: topic, mode: "insensitive" } } },
    });

    if (!posts || posts.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: " No posts to display" });
    }

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log("error:", error.message);
    await deleteFile(imageFile.filename);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const { id, title, body, snippet, slug, description, topicId } = req.body;
  const postId = parseInt(id);
  const newImage = req.file;
  const writerId = req.user.id;

  if (!title || !body || !snippet || !slug || !description || !topicId) {
    if (newImage) {
      await deleteFile(newImage.filename);
    }

    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // if post exist and belongs to the current user
    const post = await prisma.post.findFirst({
      where: { id: postId, writerId: writerId },
    });

    if (!post) {
      if (newImage) {
        await deleteFile(newImage.filename);
        return res
          .status(400)
          .json({ success: false, message: "Post not found" });
      }
    }
    // verify topic exist
    const topicexist = await prisma.topic.findUnique({
      where: { id: parseInt(topicId) },
    });
    if (!topicexist) {
      if (newImage) {
        await deleteFile(newImage.filename);
      }
      return res
        .status(400)
        .json({ success: true, message: "selected topic does not exist" });
    }
    // check for duplicate title
    const postByTitle = await prisma.post.findFirst({
      where: { title: title, NOT: { id: postId } },
    });
    if (postByTitle) {
      if (newImage) {
        await deleteFile(newImage.filename);
      }
      return res
        .status(400)
        .json({ success: false, message: "Post with similar title exists" });
    }
    // check for duplicate slug (exlude the current)
    const postBySlug = await prisma.post.findFirst({
      where: { slug: slug, NOT: { id: postId } },
    });
    if (postBySlug) {
      if (newImage) {
        await deleteFile(newImage.filename);
      }
      return res
        .status(400)
        .json({ success: false, message: "Post with similar slug exists" });
    }
    // handle image update
    let imageName = post.image;
    if (newImage) {
      if (post.image) {
        await deleteFile(post.image);
      }
      imageName = newImage.filename;
    }

    const updatePost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        body,
        snippet,
        image: imageName,
        slug,
        description,
        writerId: writerId,
        topicId: parseInt(topicId),
      },
    });

    res.status(200).json({
      success: true,
      message: "post updated successfully",
      data: updatePost,
    });
  } catch (error) {
    if (newImage) {
      await deleteFile(newImage.filename);
    }
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const viewSinglePost = async (req, res) => {
  const { slug } = req.params;

  try {
    // get post based on slug
    const post = await prisma.post.findFirst({ where: { slug: slug } });
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
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    if (!post) {
      return res
        .status(400)
        .json({ success: false, message: "Post with such id not found.." });
    }

    if (post.image) {
      await deleteFile(post.image);
    }

    await prisma.post.delete({ where: { id: parseInt(id) } });
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting post" });
  }
};
