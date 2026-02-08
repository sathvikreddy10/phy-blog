"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase"; 
import Link from "next/link";
import Bookmark from "./Bookmark.svg"; 

export default function BookmarkBtn() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  
  // Logic States
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [currentBlogTitle, setCurrentBlogTitle] = useState("");
  const [isCurrentSaved, setIsCurrentSaved] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Load Bookmarks
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const saved = JSON.parse(localStorage.getItem('myBookmarks') || '[]');
        setBookmarks(saved);
    }
  }, []);

  // Check Page
  useEffect(() => {
    setCurrentBlogId(null);
    setCurrentBlogTitle("");
    setIsCurrentSaved(false);

    // Regex to match /blog/123
    const match = pathname?.match(/^\/blog\/(\d+)$/);
    if (match) {
        const id = match[1];
        setCurrentBlogId(id);
        const saved = JSON.parse(localStorage.getItem('myBookmarks') || '[]');
        const alreadySaved = saved.some(b => b.id.toString() === id.toString());
        setIsCurrentSaved(alreadySaved);

        if (!alreadySaved) {
             const fetchTitle = async () => {
                const { data } = await supabase.from('posts').select('title').eq('id', id).single();
                if (data) setCurrentBlogTitle(data.title);
             };
             fetchTitle();
        }
    }
  }, [pathname, isOpen]);

  const addBookmark = () => {
      if (!currentBlogId || !currentBlogTitle) return;
      const newSaved = [{ id: currentBlogId, title: currentBlogTitle, date: new Date().toISOString() }, ...bookmarks];
      localStorage.setItem('myBookmarks', JSON.stringify(newSaved));
      setBookmarks(newSaved);
      setIsCurrentSaved(true);
  };

  const removeBookmark = (e, id) => {
      e.stopPropagation();
      const newSaved = bookmarks.filter(b => b.id.toString() !== id.toString());
      localStorage.setItem('myBookmarks', JSON.stringify(newSaved));
      setBookmarks(newSaved);
      if (id.toString() === currentBlogId?.toString()) setIsCurrentSaved(false);
  };

  return (
    <div className="relative inline-flex items-center z-50 font-body" ref={dropdownRef}>
      
      <button 
        onClick={(e) => {
            e.stopPropagation(); 
            setIsOpen(!isOpen);
        }} 
        className="bg-transparent border-none p-0 cursor-pointer outline-none hover:opacity-70 transition-opacity"
      >
        <span className="Links_to_pages flex items-center gap-2 py-0.5 text-12">
            <img src={Bookmark.src} alt="Bookmark" /> 
            Bookmarks 
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 md:left-auto md:right-0 top-full mt-4 w-[20rem] max-w-[85vw] bg-[#fff8f0] rounded-xl shadow-2xl border border-[#FFA443]/20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
            
            {/* ADD CURRENT PAGE */}
            {currentBlogId && !isCurrentSaved && currentBlogTitle && (
                <div className="p-3 bg-orange-50 border-b border-orange-100">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-bold text-orange-800 tracking-wider">CURRENT PAGE</span>
                        <button 
                            onClick={addBookmark}
                            className="bg-black text-[#FFA443] text-[10px] font-bold px-2 py-1 rounded hover:opacity-80 transition-opacity"
                        >
                            ADD +
                        </button>
                    </div>
                    <div className="text-xs font-medium text-black/80 truncate">
                        {currentBlogTitle}
                    </div>
                </div>
            )}

            {/* BOOKMARK LIST */}
            <div className="max-h-[300px] overflow-y-auto p-2 flex flex-col gap-1">
                {bookmarks.length === 0 ? (
                    <div className="p-4 text-center text-xs opacity-50">No bookmarks yet.</div>
                ) : (
                    bookmarks.map((b) => (
                        <div key={b.id} className="group relative flex items-center">
                            <Link 
                                href={`/blog/${b.id}`}
                                onClick={() => setIsOpen(false)}
                                className="block w-full p-2 rounded-lg hover:bg-white hover:shadow-sm transition-all text-xs text-black/80 pr-6 truncate"
                            >
                                {b.title}
                            </Link>
                            <button 
                                onClick={(e) => removeBookmark(e, b.id)}
                                className="absolute right-2 text-black/20 hover:text-red-500 font-bold text-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            >
                                ×
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
      )}
    </div>
  );
}