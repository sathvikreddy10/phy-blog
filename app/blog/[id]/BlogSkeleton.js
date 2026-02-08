import React from 'react';
// Check this import path based on your folder structure!
import Navbar from "../../components/Navbar/Navbar"; 

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FFA443] font-body pb-20">
      
      {/* 1. Navbar */}
      <div className="relative z-10">
        <Navbar /> 
      </div>

      {/* 2. Main Grid Layout (Matches your page.js exactly) */}
      <div className="pr-[3.65rem] pl-[5rem] pt-[1.85rem] grid gap-10 grid-cols-12 relative items-start animate-pulse">

        {/* --- LEFT SIDE GHOST --- */}
        <div className="Blog_Details flex flex-col col-span-9 gap-7 pr-8">
            
            {/* Title & Author Ghost */}
            <div className="heading_author flex flex-col pt-1 gap-4">
                {/* Big Title Bar */}
                <div className="h-20 bg-black/10 rounded-lg w-3/4 mt-4"></div>
                {/* Author Bar */}
                <div className="h-6 bg-black/10 rounded w-1/4 self-end"></div>
            </div>

            {/* Content Block Ghost (Text + Image) */}
            <div className="flex flex-row gap-8 mt-4">
                {/* Text Lines */}
                <div className="flex-1 flex flex-col gap-3 pt-1.5">
                    <div className="h-4 bg-black/10 rounded w-full"></div>
                    <div className="h-4 bg-black/10 rounded w-full"></div>
                    <div className="h-4 bg-black/10 rounded w-11/12"></div>
                    <div className="h-4 bg-black/10 rounded w-full"></div>
                    <div className="h-4 bg-black/10 rounded w-4/5"></div>
                    <div className="h-4 bg-black/10 rounded w-full"></div>
                </div>
                {/* Image Box */}
                <div className="w-[22rem] h-[22rem] shrink-0 bg-black/10 rounded-sm mt-1"></div>
            </div>

            {/* Second Text Block Ghost */}
            <div className="flex flex-col gap-3">
                 <div className="h-4 bg-black/10 rounded w-full"></div>
                 <div className="h-4 bg-black/10 rounded w-11/12"></div>
                 <div className="h-4 bg-black/10 rounded w-full"></div>
            </div>
        </div>

        {/* --- RIGHT SIDE PLACEHOLDER --- */}
        <div className="col-span-3 hidden lg:block"></div>

      </div>


      {/* --- SIDEBAR GHOST (Fixed Position) --- */}
      <div className="fixed bottom-8 right-[3.65rem] w-[20%] h-[38rem] flex flex-col justify-end gap-4 z-50 animate-pulse">

            {/* Progress Bar Ghost */}
            <div className="h-[5rem] bg-[#fecc97]/50 rounded-xl backdrop-blur-sm border border-black/5"></div>
                
            {/* Blog List Ghost */}
            <div className="flex-1 bg-[#D9D9D9]/50 rounded-xl border border-white/20"></div>

            {/* Papers Used Ghost */}
            <div className="h-[4.5rem] bg-[#D9D9D9]/50 rounded-xl shrink-0 border border-white/20"></div>

            {/* Author Ghost */}
            <div className="h-[4.5rem] bg-[#D9D9D9]/50 rounded-xl shrink-0 border border-white/20"></div>

      </div>

    </div>
  );
}