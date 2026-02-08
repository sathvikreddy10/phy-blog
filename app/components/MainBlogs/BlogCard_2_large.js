import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import photo from "./placeholder.png"

export default function BlogCard_2_large({ data }) {

  const getCoverImage = () => {
    if (!data?.content) return photo.src;
    const imgBlock = data.content.find(b => b.image && b.image.length > 0);
    return imgBlock ? imgBlock.image : photo.src;
  };

  const getExcerpt = () => {
    if (!data?.content) return "No description available.";
    const textBlock = data.content.find(b => b.text && b.text.trim().length > 0);
    return textBlock ? textBlock.text.replace(/<[^>]+>/g, '') : "";
  };

  const formatDate = (dateString) => {
    if(!dateString) return "";
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const day = date.getDate();
    const year = date.toLocaleDateString('en-US', { year: '2-digit' });
    return `${month} ${day}/${year}`;
  };

  return (
    // CHANGED: Outer div is now a Link
    <Link 
        href={`/blog/${data?.id}`}
        className="BlogCard_large border border-[#c3c3c3bc] rounded-[1.5rem] w-[42.15rem] h-[22.5rem] flex px-7 py-2 relative overflow-hidden items-center gap-8 shrink-0 hover:shadow-lg transition-shadow duration-300"
    >

        <div className="letters w-[55%] h-full flex flex-col justify-between">

          <div className="header_and_author flex flex-col mt-6 w-full">

            <div className="blog_heading font-heading font-semibold text-[1.65rem] truncate text-black">
                {data?.title || "Untitled"}
            </div>
            <div className="author_name font-body font-medium text-xs text-[#a7a4a4] flex items-center justify-end gap-1">
    
                <div className="w-2 h-[2px] bg-[#c9c6c6] truncate"></div> 
                 {data?.author_name || "Unknown"}
            </div>

          </div>
          <div className="exprit_extras flex flex-col w-full">
            
            <div className="exprit font-body font-normal leading-tight line-clamp-8 text-black">
                {getExcerpt()}
            </div>
            
            <div className="extras mt-auto w-full flex items-center justify-between pt-4 border-t border-transparent">

            <div className="flex gap-4 text-xs font-normal font-body text-[#171717]">
              <div className="read_time">5 min</div>
              <div className="Date_upload">{formatDate(data?.created_at)}</div>
            </div>

            {/* CHANGED: Just a visual div now */}
            <div className="Read_more text-xs font-normal font-body text-[hsl(42,59%,30%)] flex items-center gap-1 cursor-pointer hover:underline underline-offset-4">
              → Read more
            </div>
          </div>

          </div>
        </div>

    
        <div className="image_container w-[40.5%] h-full shrink-0 flex items-end justify-center pb-7">
            <div className="image_wrapper relative w-full h-[70%] rounded-[1rem] overflow-hidden items-end justify-center">
                 <Image 
                    src={getCoverImage()} 
                    fill={true}
                    alt="image"
                    className="object-cover"
                 />
            </div>
        </div>
    </Link>
  )
}