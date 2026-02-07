import Link from "next/link";
import Logo from './CUDA.svg'
import Bookmark from './Bookmark.svg'
import SearchBar from './Searchbar.js'


import React from 'react'

export default function Navbar() {
  return (
    <nav className="Navbar px-[3.65rem] py-1.5 bg-[#ffffff] flex justify-between items-center font-body">
      <div >
        <Link href="/">
      <img src={Logo.src} alt="CUDA LOGO" className="w-24 h-18"/> </Link>
      </div>
      <SearchBar/>
      <div className="link_to_pages flex items-center gap-[1.30rem] font-body">
        <span className="Links_to_pages flex items-center gap-2 py-0.5 text-12"><img src={Bookmark.src} alt="Bookmark" /> Bookmarks </span>
        <span className="Links_to_pages py-0.5"> Contact </span>
        <span className="Links_to_pages py-0.5"> Accounts </span>
      </div>
    </nav>
  )
}
