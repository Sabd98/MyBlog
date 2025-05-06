import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

//Post Table Model
export const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "Sabda Avicenna",
    },
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "posts",
    timestamps: true,
  }
);


