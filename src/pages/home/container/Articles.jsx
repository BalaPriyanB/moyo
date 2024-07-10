import React from "react";
import { FaArrowRight } from "react-icons/fa";
import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";
import { Link } from "react-router-dom";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: () => getAllPosts("", 1, 6),
    queryKey: ["posts"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return (
    <section className="grid grid-cols-2 container bg-dark-hard text-white">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 pb-10">
        {isLoading ? (
          [...Array(3)].map((_, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full dark"
            />
          ))
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the posts data" className="text-white" />
        ) : !data || !Array.isArray(data.data) ? (
          <ErrorMessage message="Posts data is not in the expected format" className="text-white" />
        ) : data.data.length === 0 ? (
          <p className="text-orange-500">No Posts Found!</p>
        ) : (
          data.data.map((post) => (
            <ArticleCard
              key={post._id}
              post={post}
              className="w-full dark text-white"
            />
          ))
        )}
      </div>
      <Link
        to="/blog"
        className="grid items-center gap-4 font-bold border-2 border-primary rounded-lg dark text-white"
      >
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </Link>
    </section>
  );
};

export default Articles;
