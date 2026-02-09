"use client"

import Link from "next/link";
import Logo from './CUDA.svg'
import SearchBar from './Searchbar.js' 
import BookmarkBtn from "./BookmarkBtn";
// 👇 1. IMPORT SUSPENSE
import React, { useState, Suspense } from 'react' 

export default function Navbar() {
  

  return (
    <nav className="Navbar px-[3.65rem] py-1.5 flex justify-between items-center font-body bg-transparent relative z-40">
      
      <div className="shrink-0">
        <Link href="/">
          <img src={Logo.src} alt="CUDA LOGO" className="w-24 h-18"/> 
        </Link>
      </div>

      {/* 👇 2. THIS IS THE FIX. WRAP IT IN SUSPENSE OR IT FREEZES. */}
      <Suspense fallback={<div className="w-64 h-10 bg-gray-200 rounded-full" />}>
          <SearchBar/>
      </Suspense>

      <div className="link_to_pages flex items-center gap-[1.30rem] font-body">
        <BookmarkBtn />
        <span className="Links_to_pages py-0.5 cursor-pointer"> Contact </span>
        <span className="Links_to_pages py-0.5 cursor-pointer"> Accounts </span>
      </div>

      

    </nav>
  )
}