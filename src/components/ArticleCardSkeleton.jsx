const ArticleCardSkeleton = ({ className }) => {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className} animate-pulse`}
    >
      {/* image */}
      <div className="w-full aspect-video bg-slate-300" />
      <div className="p-5">
        {/* title */}
        <div className="w-56 h-2 mt-4 bg-slate-300 rounded-lg" />
        {/* caption */}
        <div className="w-24 h-2 mt-4 bg-slate-300 rounded-lg" />
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
