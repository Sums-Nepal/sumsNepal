import React from "react";

type LoadingBarProps = {
  title?: string;
  subtitle?: string;
  tips?: string;
};

export default function LoadingBar({
  title = "SUMS NEPAL",
  subtitle = "Student Unified Management System",
  tips = "Preparing your workspace…",
}: LoadingBarProps) {
  return (
    <div className="w-full max-w-xl mx-auto px-6">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-8 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] -mr-10 -mt-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-600/10 rounded-full blur-[50px] -ml-10 -mb-10 animate-pulse delay-700" />

        <div className="flex items-center gap-6 relative z-10">
          {/* Advanced Spinner */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-50 to-white dark:from-slate-800 dark:to-slate-900 shadow-inner border border-slate-100 dark:border-slate-800 flex items-center justify-center shrink-0">
            <div className="relative w-8 h-8">
              <span className="absolute top-0 left-0 w-full h-full border-2 border-primary/30 rounded-full"></span>
              <span className="absolute top-0 left-0 w-full h-full border-t-2 border-primary rounded-full animate-spin"></span>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="mb-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                {title}
              </h3>
              <p className="text-xs font-bold text-primary uppercase tracking-widest truncate">{subtitle}</p>
            </div>

            {/* Loading Bar Track */}
            <div className="mt-4 h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent w-1/2 translate-x-[-100%] animate-[shimmer_1.5s_infinite]" />
              <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-primary to-orange-600 animate-[loadingBar_2s_ease-in-out_infinite]" />
            </div>
          </div>
        </div>

        {/* Shimmering Text Lines */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-600 mb-2">
            <span>System Check</span>
            <span>78%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-3/4 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse" />
          </div>
          <div className="h-2 w-2/3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
            <div className="h-full w-1/2 bg-slate-200 dark:bg-slate-700 rounded-full animate-pulse delay-150" />
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <p className="mt-6 text-center text-xs font-medium text-slate-500 dark:text-slate-400 animate-pulse">
        {tips}
      </p>

      {/* Styles */}
      <style>{`
        @keyframes loadingBar {
          0%   { transform: translateX(-100%); width: 20%; }
          50%  { transform: translateX(200%); width: 50%; }
          100% { transform: translateX(-100%); width: 20%; }
        }
        @keyframes shimmer {
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
