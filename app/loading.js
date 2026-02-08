import Navbar from "./components/Navbar/Navbar";
import CardSkeleton from "./components/Skeletons/CardSkeleton";

export default function Loading() {
  return (
    <>
      <Navbar/>
      {/* Ghost Category Bar */}
      <div className="category mt-2 h-5 px-[3.65rem] flex items-center gap-4">
         <div className="h-full w-20 bg-gray-200 rounded animate-pulse"></div>
         <div className="h-full w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>

      <div className="body_cards mt-4 flex flex-col gap-3 min-h-screen pb-20">
          
          {/* FAKE ROW 1 */}
          <div className="px-[3.65rem] flex gap-4 overflow-hidden">
             <CardSkeleton />
             <CardSkeleton />
             <CardSkeleton />
          </div>

          {/* FAKE ROW 2 */}
          <div className="px-[3.65rem] flex gap-4 overflow-hidden">
             <CardSkeleton />
             <CardSkeleton />
             <CardSkeleton />
          </div>
      </div>
    </>
  );
}