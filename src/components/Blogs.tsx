
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Temporary mock data until we integrate with backend
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Future of Code Collaboration',
    excerpt: 'Exploring how AI will transform how teams work together on code projects.',
    publishedDate: '2023-09-15',
    author: 'Alex Rivera',
    readTime: '5 min read',
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Building Scalable Applications with RecodePush',
    excerpt: 'Learn the best practices for scaling your applications using our platform.',
    publishedDate: '2023-08-28',
    author: 'Jamie Chen',
    readTime: '7 min read',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'How to Optimize Your Development Workflow',
    excerpt: 'Tips and tricks to streamline your coding process and maximize productivity.',
    publishedDate: '2023-08-10',
    author: 'Sam Taylor',
    readTime: '4 min read',
    category: 'Productivity',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  }
];

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  publishedDate: string;
  author: string;
  readTime: string;
  category: string;
  thumbnail: string;
};

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    // Only get the 3 most recent posts
    setBlogPosts(mockBlogPosts.slice(0, 3));
  }, []);

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest From Our Blog</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Stay updated with the latest insights, tutorials, and news about code collaboration and development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-neutral-500 mb-2">
                  <span className="px-2 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-neutral-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-2">
                      <span className="text-sm font-medium">{post.author.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <span className="text-sm text-neutral-500">{post.publishedDate}</span>
                </div>
              </div>
              <div className="px-6 pb-6">
                <Link to={`/blog/${post.id}`}>
                  <Button variant="ghost" className="w-full justify-center group">
                    Read Article 
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/blog">
            <Button className="bg-brand-600 hover:bg-brand-700 text-white transition-all group">
              View All Articles
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
