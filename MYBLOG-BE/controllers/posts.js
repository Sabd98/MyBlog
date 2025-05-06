import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path, { dirname, join } from "path";
import { Post } from "../models/Post.js";
import { fileURLToPath } from "url";
export const router = Router();

//File Upload Middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

//fetch posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        "description",
        "author",
        "createdAt",
        "image_url",
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Fetch a post
router.get("/:id", async (req, res) => {
  try {
    console.log(typeof req.params.id)
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Create Post
router.post("/", upload.single("image"), async (req, res) => {
  console.log(req.file.filename,'sasa');  
  try {
    const { title, description, content } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;
    const post = await Post.create({
      title,
      description,
      content,
      author: "Sabda Avicenna",
      image_url,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Update Post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    let image_url = post.image_url;
    if (req.file) {
      if (post.image_url) {
        const oldImagePath = path.join(__dirname, "..", post.image_url);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Error deleting old image:", err);
        });
      }
      image_url = `/uploads/${req.file.filename}`;
    }
    await post.update({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: "Sabda Avicenna",
      image_url,
    });

    res.json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//File Config
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Delete Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.image_url) {
      const filename = post.image_url.split("/uploads/").pop();
      const imagePath = join(__dirname, "..", "uploads", filename);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); 
      } else {
        console.warn("Image file not found:", imagePath);
      }
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: err.message });
  }
});
