"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation"; 
import { supabase } from "../../lib/supabase"; 
import Navbar from "../../components/Navbar/Navbar"; 
import Image from "next/image";
import arrow from "./arrow.svg"; 

// 1. ADD THIS IMPORT
import BlogSkeleton from "./BlogSkeleton"; 

export default function BlogPost() {

  const { id } = useParams();
  
  // --- STATE ---
  const [activeSection, setActiveSection] = useState('blogs');
  const [post, setPost] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]); 
  const [scrollProgress, setScrollProgress] = useState(0);

  // --- FETCH DATA ---
  useEffect(() => {
    if(!id) return;
    
    const fetchData = async () => {
        // 1. Fetch Current Post
        const { data: currentPost, error: postError } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single();
        
        if(!postError) setPost(currentPost);

        // 2. Fetch Recommendations
        const { data: others, error: othersError } = await supabase
            .from('posts')
            .select('id, title, content')
            .neq('id', id)
            .limit(5);

        if(!othersError) setOtherBlogs(others || []);
    };
    
    fetchData();
  }, [id]);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.floor((window.scrollY / totalHeight) * 100);
        setScrollProgress(Math.min(100, Math.max(0, progress)));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSection = (section) => {
      setActiveSection(section === activeSection ? 'blogs' : section);
  };
  
  const getExcerpt = (content) => {
    if (!content) return "";
    const textBlock = content.find(b => b.text && b.text.trim().length > 0);
    return textBlock ? textBlock.text.replace(/<[^>]+>/g, '') : "";
  };


  // 2. THE FIX: SWAP EMPTY DIV FOR SKELETON
  if (!post) return <BlogSkeleton />;


  // 3. YOUR EXACT UI (Untouched)
  return (
    <div className="min-h-screen bg-[#FFA443] font-body pb-20">
      
      <style jsx global>{`
        .blog-content a { text-decoration: underline; font-weight: 500; }
      `}</style>

      <div className="relative z-10">
        <Navbar /> 
      </div>

      <div className="pr-[3.65rem] pl-[5rem] pt-[1.85rem] grid gap-10 grid-cols-12 relative items-start">

        {/* --- LEFT SIDE (CONTENT) --- */}
        <div className="Blog_Details flex flex-col col-span-9 gap-7 pr-8">
            <div className="heading_author flex flex-col pt-1">
                <div className="Heading font-heading font-semibold text-[4.75rem] text-black leading-[5rem] mt-4">
                    {post.title}
                </div>
                <div className="author self-end flex items-center gap-2 text-[1.15rem] font-body font-medium text-[#611111] pr-2 pt-1">
                    <span className="text-6xl items-centre justify-center">~</span> {post.author_name}
                </div>
            </div>

            {post.content && post.content.map((block, index) => (
                <div key={index} className="flex flex-row gap-8">
                    <div 
                        className="flex-1 text-[1.2rem] leading-tight pt-1.5 blog-content"
                        dangerouslySetInnerHTML={{ __html: block.text }}
                    >
                    </div>
                    {block.image && (
                        <div className="w-[22rem] h-[22rem] shrink-0 bg-[#d9d9d9] mt-1 relative overflow-hidden">
                            <Image 
                                src={block.image} 
                                fill={true} 
                                alt="blog visual" 
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>

        {/* --- RIGHT SIDE PLACEHOLDER --- */}
        <div className="col-span-3 hidden lg:block"></div>

      </div>


      {/* --- THE FIXED SIDEBAR --- */}
      <div className="fixed bottom-8 right-[3.65rem] w-[20%] h-[38rem] flex flex-col justify-end gap-4 z-50">

            {/* 1. PROGRESS BAR */}
            <div className="progress_indiator px-4 py-3 flex flex-col justify-between bg-[#fecc97] rounded-xl backdrop-blur-sm gap-3 shrink-0">
                <div className="progess_percentage_comment flex justify-between items-end">
                    <div className="progress_comment text-sm font-body font-medium text-[#4b2b07]">
                        {scrollProgress < 100 ? "Keep reading!" : "Done!"}
                    </div>  
                    <div className="progress_percentage font-heading text-[#4b2b07] font-medium leading-none">
                        {scrollProgress}%
                    </div>
                </div>
                <div className="progrss_bar h-[0.35rem] w-full bg-[#FFA443]">
                    <div 
                        className="h-full bg-[#4b2b07] transition-all duration-300" 
                        style={{ width: `${scrollProgress}%` }}
                    ></div>
                </div>
            </div>
                

            {/* 2. BLOG LIST */}
            <div className={`other_blogs_recomendation p-4 bg-[#D9D9D9] rounded-xl flex flex-col justify-between transition-all duration-500 ease-in-out overflow-hidden ${activeSection === 'blogs' ? 'flex-1 overflow-y-auto' : 'h-[8rem]'}`}>
                
                {otherBlogs.length > 0 ? (
                    otherBlogs.map((blog, index) => (
                        <a href={`/blog/${blog.id}`} key={blog.id} className="blog_block mt-1 shrink-0 group cursor-pointer block hover:opacity-80 transition-opacity">
                            <div className="Papers_used font-semibold font-heading text-[18px] mt-2 truncate">
                                {blog.title}
                            </div>
                            <div className="ecpricit line-clamp-2 leading-tight font-body text-sm my-2 text-black/70">
                                {getExcerpt(blog.content)}
                            </div>
                            <div className={`h-[1px] w-full bg-[linear-gradient(90deg,#D9D9D9_0%,#171717_5%,#171717_95%,#D9D9D9_100%)] mt-1 transition-opacity duration-300 ${activeSection === 'blogs' && index !== otherBlogs.length - 1 ? 'opacity-50' : 'opacity-0'}`}></div>
                        </a>
                    ))
                ) : (
                      <div className="blog_block mt-1 shrink-0 opacity-50 text-center py-4">
                        No other blogs yet.
                      </div>
                )}

            </div>


            {/* 3. PAPERS USED */}
            <div 
                onClick={() => toggleSection('papers')}
                className={`bottom_bars papers_used p-4 bg-[#D9D9D9] rounded-xl cursor-pointer overflow-hidden transition-all duration-500 ease-in-out flex flex-col ${activeSection === 'papers' ? 'flex-1' : 'h-[4.5rem] shrink-0'}`}
            >
                 <div className="flex justify-between items-center mb-2 shrink-0">
                     <div className="Papers_used font-semibold font-heading text-[18px]"> Papers used</div>
                     <div className={`arrow_button w-7 h-7 relative transition-transform duration-500 ${activeSection === 'papers' ? 'rotate-180' : 'rotate-0'}`}>
                         <Image src={arrow.src} fill={true} alt="arrow" className="object-contain"/>
                     </div>
                 </div>

                 <div onClick={(e) => e.stopPropagation()} className={`text-sm font-body mt-2 overflow-y-auto transition-all duration-500 flex flex-col gap-1 ${activeSection === 'papers' ? 'opacity-100' : 'opacity-0'}`}>
                     {post.papers && post.papers.length > 0 ? (
                        post.papers.map((p, i) => (
                            <div key={i}>
                                {i+1}. {p.title} 
                                {p.link && <a href={p.link} target="_blank" className="text-blue-600 ml-1 underline">[Link]</a>}
                            </div>
                        ))
                     ) : "No papers listed."}
                 </div>
            </div>


            {/* 4. AUTHOR */}
            <div 
                onClick={() => toggleSection('author')}
                className={`bottom_bars Author p-4 bg-[#D9D9D9] rounded-xl cursor-pointer overflow-hidden transition-all duration-500 ease-in-out flex flex-col ${activeSection === 'author' ? 'flex-1' : 'h-[4.5rem] shrink-0'}`}
            >
                 <div className="flex justify-between items-center mb-2 shrink-0">
                     <div className="Papers_used font-semibold font-heading text-[18px]"> Author</div>
                     <div className={`arrow_button w-7 h-7 relative transition-transform duration-500 ${activeSection === 'author' ? 'rotate-180' : 'rotate-0'}`}>
                         <Image src={arrow.src} fill={true} alt="arrow" className="object-contain"/>
                     </div>
                 </div>

                 <div className={`text-sm font-body mt-2 overflow-y-auto transition-all duration-500 ${activeSection === 'author' ? 'opacity-100' : 'opacity-0'}`}>
                     <div className="font-bold">{post.author_name}</div>
                     <div className="text-xs opacity-70 mb-2">{post.author_role}</div>
                     <div>{post.author_bio}</div>
                 </div>
            </div>

      </div>

    </div>
  );
}