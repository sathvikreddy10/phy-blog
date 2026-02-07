import photo from "./placeholder.png";
import Image from "next/image";
import BlogCard_1_small from "./components/MainBlogs/BlogCard_1_small";

export default function Home() {
  return (

    <>

  <div className="category mt-2 h-5 px-[3.65rem] border-2">asa</div>


    <div className="px-[3.65rem] mt-4 flex gap-4 contains_all_cards">

      <BlogCard_1_small/>
      
      <div className="BlogCard_large border border-[#c3c3c3bc] rounded-[1.5rem] w-[42.15rem] h-[22.5rem] flex px-7 py-2 relative overflow-hidden  items-center gap-8">

        <div className="letters w-[55%] h-full flex flex-col justify-between">

          <div className="header_and_author flex flex-col mt-6 w-full">

            <div className="blog_heading font-heading font-semibold text-[1.65rem] truncate">India defied Einstien's India defied Einstien's</div>
            <div className="author_name font-body font-medium text-xs text-[#a7a4a4] flex items-center justify-end gap-1">
    
                <div className="w-2 h-[2px] bg-[#c9c6c6] truncate"></div> 
                  Jeffry Epstien
                </div>

          </div>
          <div className="exprit_extras flex flex-col w-full">
            
            <div className="exprit font-body font-normal leading-tight">In the 2000s, blogs were often the work of a single individual, occasionally of a small group, and often covered a single subject or topic. In the 2010s, multi-author blogs (MABs) emerged, featuring the writing of multiple authors and sometimes professionally edited. MABs from newspapers, other newspapers, other </div>
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






        <div className="right_side_container w-[40.5%] h-full shrink-0 flex items-center justify-center pb-2">
            
           
            <div className="image_wrapper relative w-full h-[85%] rounded-[1.5rem] overflow-hidden">
                 <Image 
                    src={photo.src} 
                    fill={true}
                    alt="image"
                    className="object-cover"
                 />
            </div>

        </div>

      </div>

    </div>
    
    </>
  );
}
