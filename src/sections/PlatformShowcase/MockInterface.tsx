

const MockInterface = () => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
        <div className="w-2 h-2 bg-white/40 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-2 bg-white/30 rounded w-3/4"></div>
        <div className="h-2 bg-white/30 rounded w-1/2"></div>
        <div className="h-2 bg-white/30 rounded w-2/3"></div>
      </div>
    </div>
  );
};

export default MockInterface;
