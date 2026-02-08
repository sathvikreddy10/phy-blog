import React from 'react'

export default function CardSkeleton() {
  return (
    // EXACT dimensions and border as your real card
    <div className="border border-[#c3c3c3bc] bg-white rounded-[1.5rem] w-[21.55rem] h-[22.5rem] flex flex-col px-7 py-2 relative overflow-hidden items-center animate-pulse">
        
        {/* Image Ghost */}
        <div className="w-full h-[33.80%] rounded-lg mt-[0.35rem] bg-gray-200"></div>

        <div className="flex flex-col justify-between w-full flex-1 mt-7">
            
            {/* Title Ghost (2 lines) */}
            <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-full"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            </div>

            {/* Excerpt Ghost (3 lines) */}
            <div className="space-y-2 mt-6">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Footer Ghost */}
            <div className="mt-auto pt-4 flex justify-between items-center border-t border-transparent w-full mb-2">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
        </div>
    </div>
  )
}