import { Post } from "../models/Post.js";
import sequelize from "../utils/db.js";

const postsData = [
  {
    title: "Test Post",
    description: "Test Description. Lorem ipsum dolor sil amet",
    content:
      "Test Content for testing only. Lorem ipsum dolor sil amet 1. only. Lorem ipsum dolor sil amet 2. only. Lorem ipsum dolor sil amet . only. Lorem ipsum dolor sil amet 4",
  },
  {
    title: "Test Post2",
    description: "Test Description2. Lorem ipsum dolor sil amet",
    content:
      "Test Content2 for testing only. Lorem ipsum dolor sil amet 1. only. Lorem ipsum dolor sil amet 2. only. Lorem ipsum dolor sil amet . only. Lorem ipsum dolor sil amet 4",
  },
  {
    title: "Test Post3",
    description: "Test Description3. Lorem ipsum dolor sil amet",
    content:
      "Test Content3 for testing only. Lorem ipsum dolor sil amet 1. only. Lorem ipsum dolor sil amet 2. only. Lorem ipsum dolor sil amet . only. Lorem ipsum dolor sil amet 4",
  }
];

const seedPosts = async () => {
  try {
    await sequelize.sync(); // Sync model with database
    await Post.bulkCreate(postsData);
    console.log("Posts seeded successfully!");
  } catch (error) {
    console.error("Error seeding Posts:", error);
  } finally {
    await sequelize.close();
  }
};

seedPosts();
