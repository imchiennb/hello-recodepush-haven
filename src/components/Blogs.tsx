import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQueryBlogs } from "@/hooks/blog/use-query-blogs";
import { calculateReadingTime } from "@/lib/utils";

interface MultilingualContent {
  [key: string]: string;
}

export type BlogPost = {
  id: number;
  title: string | MultilingualContent;
  excerpt: string | MultilingualContent;
  content?: string | MultilingualContent;
  publishedDate: string;
  author: string;
  readTime: string | MultilingualContent;
  category: string;
  thumbnail: string;
};

const Blogs = () => {
  const { t, i18n } = useTranslation();

  const data = useQueryBlogs({
    limit: 3,
    page: 1,
  });

  const blogs = useMemo(() => data?.data?.data, [data]);

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("blog.latestFromBlog")}
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t("blog.stayUpdated")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-neutral-500 mb-2">
                  <span className="px-2 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-medium capitalize">
                    {post.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    {post?.readTime || calculateReadingTime(post.summary)} min
                    read
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {post.title}
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
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <span className="text-sm text-neutral-500">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link to={`/blog/${post.id}`}>
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
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blog">
            <Button className="bg-brand-600 hover:bg-brand-700 text-white transition-all group">
              {t("blog.viewAllArticles")}
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
