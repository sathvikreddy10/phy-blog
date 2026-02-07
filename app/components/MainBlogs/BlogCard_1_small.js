import React from 'react'
import photo from "./placeholder.png"
import Image from 'next/image'

export default function BlogCard_1_small() {
  return (
    <div className="BlogCard_small border border-[#c3c3c3bc] rounded-[1.5rem] w-[21.55rem] h-[22.5rem] flex flex-col px-7 py-2 relative overflow-hidden  items-center">
        

        
        <div className="image_container w-full h-[33.80%] rounded-lg relative overflow-hidden mt-[0.35rem]">
         <Image src={photo.src} fill={true} alt="image" className="object-cover"/>
        </div>

      <div className="letters flex flex-col justify-between w-full flex-1">

       <div className="heading_and_author w-full">
        <div className="blog_heading font-heading font-semibold text-[1.65rem] mt-7 ml-1 pr-0.5 truncate">India defied Einstien's India defied Einstien's</div>

        <div className="author_name font-body font-medium text-xs text-[#a7a4a4] flex items-center justify-end gap-1">
   
              <div className="w-2 h-[2px] bg-[#a7a4a4] truncate"></div> 
    
              Jeffry Epstien
        </div>
      </div>
      <div className="excr_extras flex flex-col gap-2">
        <div className="blog_expricit font-body font-normal leading-tight">
          In the 2000s, blogs were often the work of a single individual, occasionally of a small group, and often covered a single.....
          
        </div>

        <div className="extras mt-auto w-full flex items-center justify-between pt-4 border-t border-transparent">

          <div className="flex gap-4 text-xs font-normal font-body text-[#171717]">
              <div className="read_time">5 min</div>
              <div className="Date_upload">Jan 12/26</div>
          </div>

            
          <div className="Read_more text-xs font-normal font-body text-[hsl(42,59%,30%)] flex items-center gap-1 cursor-pointer hover:underline underline-offset-4">
              → Read more
          </div>
        </div>
      </div>
    </div>
      </div>
  )
}
