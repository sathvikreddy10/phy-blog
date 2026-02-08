"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase"; // Adjust path if needed (../../lib/supabase)
import Link from "next/link";
import Navbar from "../../components/Navbar/Navbar"; //

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. FETCH POSTS ---
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, created_at, category, author_name')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error:', error);
    else setPosts(data || []);
    setLoading(false);
  };

  // --- 2. DELETE LOGIC ---
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this vibe? This cannot be undone.");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
        alert("Error deleting: " + error.message);
    } else {
        // Remove from local state instantly
        setPosts(posts.filter(post => post.id !== id));
    }
  };

  const formatDate = (dateString) => {
    if(!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-[#FFA443] font-body pb-20">
      
      {/* Navbar (Optional, can remove if you want a standalone admin page) */}
      <div className="relative z-10">
         <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="font-heading font-bold text-5xl text-black">Dashboard</h1>
                <p className="font-body text-black/60 mt-2">Manage your vibes.</p>
            </div>
            
            {/* LINK TO YOUR CREATE PAGE - Adjust href if your create page is different */}
            <Link 
                href="/upload" 
                className="bg-black text-[#FFA443] font-heading font-bold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-xl"
            >
                + NEW POST
            </Link>
        </div>

        {/* TABLE HEADER */}
        <div className="bg-black/10 rounded-t-xl p-4 grid grid-cols-12 gap-4 font-heading font-bold text-sm tracking-wider opacity-70">
            <div className="col-span-6">TITLE</div>
            <div className="col-span-2">CATEGORY</div>
            <div className="col-span-2">DATE</div>
            <div className="col-span-2 text-right">ACTIONS</div>
        </div>

        {/* BLOG LIST */}
        <div className="flex flex-col gap-2">
            {loading ? (
                <div className="p-8 text-center opacity-50 font-heading text-xl">Loading vibes...</div>
            ) : posts.length === 0 ? (
                <div className="p-8 text-center opacity-50 font-heading text-xl">No posts found.</div>
            ) : (
                posts.map((post) => (
                    <div key={post.id} className="bg-[#D9D9D9] p-4 rounded-xl grid grid-cols-12 gap-4 items-center hover:bg-white transition-colors shadow-sm">
                        
                        {/* Title */}
                        <div className="col-span-6 font-heading font-semibold text-xl truncate pr-4">
                            <Link href={`/blog/${post.id}`} className="hover:underline">
                                {post.title}
                            </Link>
                        </div>

                        {/* Category */}
                        <div className="col-span-2">
                            <span className="bg-black/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                                {post.category || "General"}
                            </span>
                        </div>

                        {/* Date */}
                        <div className="col-span-2 text-sm opacity-60 font-medium">
                            {formatDate(post.created_at)}
                        </div>

                        {/* Actions */}
                        <div className="col-span-2 flex justify-end gap-3">
                             <Link 
                                href={`/blog/${post.id}`} 
                                className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                                title="View"
                             >
                                👁️
                             </Link>
                             <button 
                                onClick={() => handleDelete(post.id)}
                                className="w-10 h-10 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors font-bold text-lg"
                                title="Delete"
                             >
                                ×
                             </button>
                        </div>
                    </div>
                ))
            )}
        </div>

      </div>
    </div>
  );
}