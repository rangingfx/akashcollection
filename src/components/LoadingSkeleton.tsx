import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div 
      className="w-full h-[500px] bg-white border border-stone-200 rounded-xl overflow-hidden flex flex-col shadow-sm"
      id="facebook-skeleton-loader"
    >
      {/* Cover Photo Skeleton */}
      <div className="h-44 bg-stone-150 animate-pulse relative">
        {/* Profile Pic Circle Overlay */}
        <div className="absolute bottom-[-24px] left-6 w-20 h-20 rounded-full bg-stone-200 border-4 border-white animate-pulse" />
      </div>

      {/* Profile Details Skeleton */}
      <div className="pt-8 px-6 pb-4 border-b border-stone-100 space-y-2">
        <div className="h-5 bg-stone-150 rounded w-1/2 animate-pulse" />
        <div className="h-3.5 bg-stone-100 rounded w-1/3 animate-pulse" />
        <div className="flex gap-2 pt-2">
          <div className="h-8 bg-stone-150 rounded-lg w-24 animate-pulse" />
          <div className="h-8 bg-stone-100 rounded-lg w-20 animate-pulse" />
        </div>
      </div>

      {/* Feed Posts Skeleton */}
      <div className="p-6 space-y-6 flex-grow overflow-hidden">
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-stone-150 animate-pulse" />
              <div className="space-y-1.5 flex-1">
                <div className="h-3 bg-stone-150 rounded w-1/4 animate-pulse" />
                <div className="h-2.5 bg-stone-100 rounded w-1/6 animate-pulse" />
              </div>
            </div>
            <div className="space-y-2 pt-1">
              <div className="h-3 bg-stone-100 rounded w-full animate-pulse" />
              <div className="h-3 bg-stone-100 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
