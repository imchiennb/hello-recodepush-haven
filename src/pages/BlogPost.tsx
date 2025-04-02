import { useParams } from "react-router-dom";
import { useQueryBlogDetail } from "@/hooks/blog/use-query-blog-detail";
import { calculateReadingTime } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlateEditor } from "@/components/editor/plate-editor";
import NotionTextEditor from "./NotionTextEditor";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQueryBlogDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4">
          <div className="animate-pulse">
            <div className="h-8 w-3/4 bg-neutral-200 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-neutral-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
              <div className="h-4 bg-neutral-200 rounded"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const post = data?.data;

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <p className="text-neutral-600">The post you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-sm text-neutral-500">
                <span className="px-2 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-medium capitalize">
                  {post.category}
                </span>
                <span className="mx-2">•</span>
                <span>{post?.readTime || calculateReadingTime(post.summary)} min read</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </header>

            {post.thumbnail && (
              <div className="mb-8">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            <PlateEditor setValue={() => {}} value={JSON.parse(post.content)} readOnly/>
          </article>
          </div>
        </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
