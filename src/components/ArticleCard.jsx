import React from "react";
import { Link } from "react-router-dom";
import { images, stables } from "../constants";

const ArticleCard = ({ post, className }) => {
  const postDate = new Date(post.createdAt);

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] bg-dark-bg ${className}`}
    >
      <Link to={`/blog/${post.slug}`}>
        <img
          src={
            post.photo
              ? `${stables.UPLOAD_FOLDER_BASE_URL}${post.photo}`
              : images.samplePostImage
          }
          alt={post.title || "Post Image"}
          className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
        />
      </Link>
      <div className="p-5">
        <Link to={`/blog/${post.slug}`}>
          <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px] text-dark-light">
            {post.title}
          </h2>
          <p className="text-dark-light mt-3 text-sm md:text-lg text-dark-light">
            {post.caption}
          </p>
        </Link>
        <span className="font-bold text-dark-light italic text-sm md:text-base">
          {postDate.getDate()}{" "}
          {postDate.toLocaleString("default", { month: "long" })}
        </span>
      </div>
    </div>
  );
};

export default ArticleCard;
