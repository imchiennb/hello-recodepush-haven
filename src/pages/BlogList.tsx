import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost } from "@/components/Blogs";
import { useTranslation } from "react-i18next";
import { useQueryBlogs } from "@/hooks/blog/use-query-blogs";
import { calculateReadingTime } from "@/lib/utils";

const categories = [
  "All",
  "AI",
  "Development",
  "Productivity",
  "Collaboration",
  "Security",
  "devops",
];

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || "en";

  const { data: blogs, isLoading } = useQueryBlogs();

  const filteredPosts = blogs?.data?.filter((post) => {
    const titleStr = post.title;
    const excerptStr = post.summary;

    const matchesSearch =
      titleStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      excerptStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || post.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t("blog.latestFromBlog")}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t("blog.stayUpdated")}
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <Input
                type="text"
                placeholder="Search articles..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex-shrink-0">
                  <Filter size={16} className="mr-2" />
                  {categoryFilter === "All" ? "All Categories" : categoryFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                    {categoryFilter === category && (
                      <Check className="ml-2 h-4 w-4" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {isLoading && (
            <div className="container mx-auto pt-32 pb-20 px-4 flex justify-center items-center">
              <div className="animate-pulse text-center">
                <div className="h-10 w-64 bg-neutral-200 rounded mb-4 mx-auto"></div>
                <div className="h-4 w-32 bg-neutral-200 rounded mb-8 mx-auto"></div>
                <div className="h-64 w-full max-w-3xl bg-neutral-200 rounded mx-auto"></div>
              </div>
            </div>
          )}
          {!isLoading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts?.length > 0 ? (
              filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={
                        typeof post.title === "string"
                          ? post.title
                          : String(post.title[currentLanguage] || post.title.en)
                      }
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-neutral-500 mb-2">
                      <span className="px-2 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>
                        {post?.readTime || calculateReadingTime(post.summary)}{" "}
                        min read
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 line-clamp-2">
                      {typeof post.title === "string"
                        ? post.title
                        : String(post.title[currentLanguage] || post.title.en)}
                    </h3>
                    <p className="text-neutral-600 mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-2">
                          <span className="text-sm font-medium">
                            {post.author.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium">
                          {post.author}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-500">
                        {" "}
                        {post.createdAt
                          ? new Date(post.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <Link to={`/blog/${post.slug}`}>
                      <Button
                        variant="ghost"
                        className="w-full justify-center group"
                      >
                        {t("blog.readArticle")}
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
                      </Button>
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-neutral-500">
                <p className="text-lg">{t("blog.noBlogsFound")}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogList;
