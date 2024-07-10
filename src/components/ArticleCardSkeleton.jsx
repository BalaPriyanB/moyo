const ArticleCardSkeleton = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden ${className} animate-pulse bg-dark-soft`}
    >
      {/* image */}
      <div className="w-full aspect-video bg-dark-soft" />
      <div className="p-5">
        {/* title */}
        <div className="w-24 bg-dark-soft rounded-lg" />
        {/* caption */}
        <div className="w-12 bg-dark-soft rounded-lg" />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;

