import React from "react";
import { Link } from "react-router-dom";
import { images, stables } from "../constants";

const ArticleCard = ({ post, className }) => {
  const postDate = new Date(post.createdAt);

  return (
    <div
      className={`rounded-xl overflow-hidden bg-dark-soft ${className}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <img
          src={
            post.photo
              ? `${stables.UPLOAD_FOLDER_BASE_URL}${post.photo}`
              : images.samplePostImage
          }
          alt={post.title || "Post Image"}
          className="w-full object-cover object-center"
        />
      </Link>
      <div className="p-5">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-roboto font-bold text-dark-soft text-white">
            {post.title}
          </h2>
          <p className="text-white text-white">
            {post.caption}
          </p>
        </Link>
        <span className="font-bold text-white italic">
          {postDate.getDate()}{" "}
          {postDate.toLocaleString("default", { month: "long" })}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
