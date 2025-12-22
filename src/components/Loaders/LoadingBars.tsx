import React from "react";

type LoadingBarProps = {
  title?: string;
  subtitle?: string;
  tips?:string;
};

export default function LoadingBar({
  title = "Loading projects…",
  subtitle = "Fetching the next page, please wait.",
  tips= "Tip: you can keep browsing while we load more."
}: LoadingBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
        <div className="flex items-start gap-4">
          {/* spinner dot */}
          <div className="mt-1 h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-orange-500 animate-ping" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="text-sm text-slate-500">{subtitle}</p>
              </div>

              <span className="text-xs font-medium text-slate-400">
                Please wait
              </span>
            </div>

            {/* loading bar track */}
            <div className="mt-4 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
              {/* animated bar */}
              <div className="h-full w-1/3 rounded-full bg-orange-500 animate-loading-bar" />
            </div>

            {/* shimmer lines */}
            <div className="mt-5 space-y-2">
              <div className="h-3 w-3/4 rounded bg-slate-100 overflow-hidden">
                <div className="h-full w-full animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
              </div>
              <div className="h-3 w-2/3 rounded bg-slate-100 overflow-hidden">
                <div className="h-full w-full animate-pulse bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* helper text */}
      <p className="mt-3 text-center text-xs text-slate-500">
        {tips}
      </p>

      {/* Custom animation (Tailwind extension OR inline style below) */}
      <style>{`
        @keyframes loadingBar {
          0%   { transform: translateX(-120%); }
          50%  { transform: translateX(120%); }
          100% { transform: translateX(-120%); }
        }
        .animate-loading-bar {
          animation: loadingBar 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
