
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Filter, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost } from '@/components/Blogs';

// Extended mock data for blog list
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
  },
  {
    id: 4,
    title: 'Collaborative Coding Techniques',
    excerpt: 'How to effectively collaborate on code with distributed teams.',
    publishedDate: '2023-07-22',
    author: 'Taylor Jordan',
    readTime: '6 min read',
    category: 'Collaboration',
    thumbnail: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    title: 'The Rise of AI in Code Quality',
    excerpt: 'How artificial intelligence is improving code quality and developer productivity.',
    publishedDate: '2023-07-14',
    author: 'Morgan Lee',
    readTime: '8 min read',
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    title: 'Security Best Practices for Developers',
    excerpt: 'Essential security practices every developer should follow to protect their applications.',
    publishedDate: '2023-06-30',
    author: 'Jamie Singh',
    readTime: '9 min read',
    category: 'Security',
    thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  }
];

const categories = ["All", "AI", "Development", "Productivity", "Collaboration", "Security"];

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  useEffect(() => {
    // In a real app, this would be an API call
    setBlogPosts(mockBlogPosts as BlogPost[]);
  }, []);

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Insights, tutorials, and news about code collaboration and development.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
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
                  {categoryFilter === 'All' ? 'All Categories' : categoryFilter}
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
                    {categoryFilter === category && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
              ))
            ) : (
              <div className="col-span-full py-12 text-center text-neutral-500">
                <p className="text-lg">No articles found matching your search criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('All');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogList;
