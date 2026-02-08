import { supabase } from "./lib/supabase"; 
import BlogsContent from "./HomeBlogs/BlogsContent";
import Navbar from "./components/Navbar/Navbar";
import CategoryBar from "./components/CategoryBar"; // 👈 Import the new component

export const revalidate = 0;

export default async function Home({ searchParams }) {
  
  // 1. Unwrap Search Params
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.q?.toString().toLowerCase() || "";
  const selectedCategory = resolvedParams?.category || "All";

  // 2. Fetch ALL posts from Supabase
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) console.error("Error fetching posts:", error);

  // 3. EXTRACT UNIQUE CATEGORIES (The Backend Wiring)
  // This automatically finds all categories you've used in your DB
  // ⚠️ Make sure your DB column is named 'category' or 'tag'
  const uniqueCategories = [...new Set(posts?.map(p => p.category).filter(Boolean))];

  // 4. FILTER LOGIC (Search + Category)
  let filteredPosts = posts || [];

  // Filter by Search Query
  if (searchQuery) {
    filteredPosts = filteredPosts.filter((post) => 
      post.title?.toLowerCase().includes(searchQuery)
    );
  }

  // Filter by Category
  if (selectedCategory !== "All") {
    filteredPosts = filteredPosts.filter((post) => 
      post.category === selectedCategory
    );
  }

  return (
    <>
      <Navbar/>

      {/* WIRED CATEGORY BAR */}
      <div className="category m-0 px-[3.65rem]">
         <CategoryBar categories={uniqueCategories} />
      </div>

      {/* Passing filtered data down */}
      <BlogsContent posts={filteredPosts} /> 
    </>
  );
}