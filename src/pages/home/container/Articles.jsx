import React from "react";
import { FaArrowRight } from "react-icons/fa";

import ArticleCard from "../../../components/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts } from "../../../services/index/posts";
import { toast } from "react-hot-toast";
import ArticleCardSkeleton from "../../../components/ArticleCardSkeleton";
import ErrorMessage from "../../../components/ErrorMessage";

const Articles = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllPosts,
    queryKey: "posts",
  });

  return (
    <section className="container mx-auto px-5 py-10 bg-dark-hard text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 pb-10">
        {isLoading ? (
          [...Array(5)].map((_, index) => (
            <ArticleCardSkeleton
              key={index}
              className="w-full md:w-[calc(20%-20px)] lg:w-[calc(20%-21px)] dark"
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
              className="w-full md:w-[calc(20%-20px)] lg:w-[calc(20%-21px)] dark text-white"
            />
          ))
        )}
      </div>
      <button className="mx-auto flex items-center gap-x-2 font-bold text-primary border-2 border-primary px-6 py-3 rounded-lg">
        <span>More articles</span>
        <FaArrowRight className="w-3 h-3" />
      </button>
    </section>
  );
};

export default Articles;
