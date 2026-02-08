"use client"

import Link from "next/link";
import Logo from './CUDA.svg'
import SearchBar from './Searchbar.js' 
import BookmarkBtn from "./BookmarkBtn";
// 👇 1. IMPORT SUSPENSE
import React, { useState, Suspense } from 'react' 

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="Navbar px-4 md:px-[3.65rem] py-1.5 flex justify-between items-center font-body bg-transparent relative z-40">
      
      <div className="shrink-0">
        <Link href="/">
          <img src={Logo.src} alt="CUDA LOGO" className="w-20 h-auto md:w-24 md:h-18"/> 
        </Link>
      </div>

      {/* 👇 2. THIS IS THE FIX. WRAP IT IN SUSPENSE OR IT FREEZES. */}
      <Suspense fallback={<div className="w-64 h-10 bg-gray-200 rounded-full" />}>
          <SearchBar/>
      </Suspense>

      <div className="link_to_pages hidden md:flex items-center gap-[1.30rem] font-body">
        <BookmarkBtn />
        <span className="Links_to_pages py-0.5 cursor-pointer hover:opacity-70"> Contact </span>
        <span className="Links_to_pages py-0.5 cursor-pointer hover:opacity-70"> Accounts </span>
      </div>

      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 text-black"
      >
        {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        )}
      </button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#fff8f0] border-b border-black/10 shadow-xl flex flex-col p-6 gap-6 md:hidden animate-in slide-in-from-top-2">
            <div className="scale-110 origin-left">
                <BookmarkBtn />
            </div>
            <span className="text-xl font-bold">Contact</span>
            <span className="text-xl font-bold">Accounts</span>
        </div>
      )}

    </nav>
  )
}