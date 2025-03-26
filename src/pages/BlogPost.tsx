import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost as BlogPostType } from '@/components/Blogs';

// Mock data with content
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Future of Code Collaboration',
    excerpt: 'Exploring how AI will transform how teams work together on code projects.',
    content: `
      <p>The landscape of software development is rapidly evolving, with artificial intelligence poised to revolutionize how we collaborate on code. In this article, we'll explore the emerging trends and technologies that are reshaping code collaboration.</p>
      
      <h2>AI-Powered Code Suggestions</h2>
      <p>One of the most significant advancements is the rise of AI assistants that can suggest code completions, identify bugs, and even refactor entire sections of your codebase. These tools analyze patterns across millions of repositories to provide contextually relevant suggestions that can dramatically speed up development cycles.</p>
      
      <p>The impact is particularly pronounced for teams working across different time zones or experience levels. Junior developers can learn best practices on the fly, while senior engineers can focus on architecture and complex problem-solving rather than repetitive coding tasks.</p>
      
      <h2>Real-Time Collaborative Editing</h2>
      <p>Gone are the days of clunky version control conflicts. Modern collaboration platforms now enable truly simultaneous editing, with multiple developers able to work on the same file concurrently, seeing each other's changes in real-time.</p>
      
      <p>This capability reduces the overhead of coordination and enables pair programming at a distance, fostering knowledge sharing and reducing the time spent resolving merge conflicts.</p>
      
      <h2>Automated Code Reviews</h2>
      <p>AI is also transforming the code review process. Automated systems can now scan pull requests to identify potential security vulnerabilities, performance bottlenecks, and adherence to coding standards before human reviewers even look at the code.</p>
      
      <p>This doesn't eliminate the need for human review but instead allows those reviews to focus on higher-level concerns like architecture, maintainability, and business logic correctness.</p>
      
      <h2>Looking Ahead</h2>
      <p>As these technologies mature, we can expect even deeper integration between AI and the development workflow. Imagine systems that can understand the intent behind requirements documents and generate functional prototypes, or that can predict which areas of your codebase are likely to cause problems in the future.</p>
      
      <p>At RecodePush, we're embracing these changes and building tools that enhance collaboration without replacing the human intelligence and creativity that are essential to great software development.</p>
    `,
    publishedDate: '2023-09-15',
    author: 'Alex Rivera',
    readTime: '5 min read',
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  // Other blog posts with content...
  {
    id: 2,
    title: 'Building Scalable Applications with RecodePush',
    excerpt: 'Learn the best practices for scaling your applications using our platform.',
    content: `
      <p>Scalability is one of the most critical aspects of modern application development. As your user base grows, your application needs to handle increased load without sacrificing performance or reliability.</p>
      
      <h2>Microservices Architecture</h2>
      <p>One of the key approaches to building scalable applications is adopting a microservices architecture. By breaking down your application into independent services, each responsible for a specific function, you can scale individual components based on demand rather than scaling the entire application.</p>
      
      <p>RecodePush provides built-in support for microservices development, with tools for service discovery, load balancing, and inter-service communication.</p>
      
      <h2>Horizontal Scaling</h2>
      <p>When designing for scale, prefer horizontal scaling (adding more machines) over vertical scaling (adding more power to existing machines). This approach allows for greater resilience and can often be more cost-effective.</p>
      
      <p>Our platform makes horizontal scaling straightforward with containerization support and automatic load balancing across instances.</p>
      
      <h2>Caching Strategies</h2>
      <p>Implementing effective caching can significantly reduce database load and improve response times. Consider multi-layered caching strategies, from browser caching to CDN caching to application-level caching.</p>
      
      <p>RecodePush integrates with popular caching solutions and provides guidance on optimal caching configurations for different types of applications.</p>
      
      <h2>Database Optimization</h2>
      <p>Your database often becomes the bottleneck in scalable applications. Consider strategies like read replicas for read-heavy workloads, sharding for distributing data across multiple databases, and using specialized databases for specific types of data.</p>
      
      <p>Our platform supports a variety of database technologies and scaling patterns to ensure your data layer can keep up with your application growth.</p>
    `,
    publishedDate: '2023-08-28',
    author: 'Jamie Chen',
    readTime: '7 min read',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  // Add more blog posts with content here...
];

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = () => {
      setLoading(true);
      setTimeout(() => {
        const foundPost = mockBlogPosts.find(post => post.id === Number(id));
        setPost(foundPost || null);
        setLoading(false);
      }, 500); // Simulate API delay
    };
    
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4 flex justify-center items-center">
          <div className="animate-pulse text-center">
            <div className="h-10 w-64 bg-neutral-200 rounded mb-4 mx-auto"></div>
            <div className="h-4 w-32 bg-neutral-200 rounded mb-8 mx-auto"></div>
            <div className="h-64 w-full max-w-3xl bg-neutral-200 rounded mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <article className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Link to="/blog" className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-6 transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
              
              <div className="flex flex-wrap items-center text-neutral-600 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-sm font-medium">{post.author.charAt(0)}</span>
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{post.publishedDate}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
                
                <span className="px-2 py-1 bg-brand-50 text-brand-700 rounded-full text-xs font-medium">
                  {post.category}
                </span>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
              <img 
                src={post.thumbnail} 
                alt={post.title} 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
            
            {/* Actions */}
            <div className="flex justify-between items-center border-t border-neutral-200 pt-8">
              <Link to="/blog">
                <Button variant="outline">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to All Articles
                </Button>
              </Link>
              
              <Link to={`/blog/edit/${post.id}`}>
                <Button className="bg-brand-600 hover:bg-brand-700 text-white">
                  <Edit size={16} className="mr-2" />
                  Edit Article
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
