import React from 'react'
import Image from 'next/image'
import Link from 'next/link' // Import Link
import photo from "./placeholder.png"

export default function BlogCard_1_small({ data }) {

  // --- LOGIC ---
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
  // --- END LOGIC ---

  return (
    // CHANGED: Outer div is now a Link. CSS classes are identical.
    <Link 
        href={`/blog/${data?.id}`}
        className="BlogCard_small border border-[#c3c3c3bc] rounded-[1.5rem] w-[21.55rem] h-[22.5rem] flex flex-col px-7 py-2 relative overflow-hidden items-center hover:shadow-lg transition-shadow duration-300"
    >
        
        <div className="image_container w-full h-[33.80%] rounded-lg relative overflow-hidden mt-[0.35rem]">
           <Image 
                src={getCoverImage()} 
                fill={true} 
                alt="image" 
                className="object-cover"
            />
        </div>

      <div className="letters flex flex-col justify-between w-full flex-1">

        <div className="heading_and_author pr-0.5 w-full">
           <div className="blog_heading font-heading font-semibold text-[1.65rem] mt-7 ml-1 truncate text-black">
               {data?.title || "Untitled"}
           </div>

           <div className="author_name font-body font-medium text-xs text-[#a7a4a4] flex items-center justify-end gap-1">
              <div className="w-2 h-[2px] bg-[#a7a4a4] truncate"></div> 
              {data?.author_name || "Unknown"}
           </div>
        </div>

        <div className="excr_extras flex flex-col gap-2">
           <div className="blog_expricit font-body font-normal leading-tight line-clamp-4 text-black">
             {getExcerpt()}
           </div>

           <div className="extras mt-auto w-full flex items-center justify-between pt-4 border-t border-transparent">

             <div className="flex gap-4 text-xs font-normal font-body text-[#171717]">
                 <div className="read_time">5 min</div>
                 <div className="Date_upload">{formatDate(data?.created_at)}</div>
             </div>
               
             {/* CHANGED: This is now just a DIV, because the parent is the Link */}
             <div className="Read_more text-xs font-normal font-body text-[hsl(42,59%,30%)] flex items-center gap-1 cursor-pointer hover:underline underline-offset-4">
                 → Read more
             </div>
           </div>
        </div>
      </div>
    </Link>
  )
}