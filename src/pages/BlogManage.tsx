
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit, Trash2, Eye, Search, Check, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost } from '@/components/Blogs';

// Extended mock data for management
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Future of Code Collaboration',
    excerpt: 'Exploring how AI will transform how teams work together on code projects.',
    publishedDate: '2023-09-15',
    author: 'Alex Rivera',
    readTime: '5 min read',
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  },
  {
    id: 2,
    title: 'Building Scalable Applications with RecodePush',
    excerpt: 'Learn the best practices for scaling your applications using our platform.',
    publishedDate: '2023-08-28',
    author: 'Jamie Chen',
    readTime: '7 min read',
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  },
  {
    id: 3,
    title: 'How to Optimize Your Development Workflow',
    excerpt: 'Tips and tricks to streamline your coding process and maximize productivity.',
    publishedDate: '2023-08-10',
    author: 'Sam Taylor',
    readTime: '4 min read',
    category: 'Productivity',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  },
  {
    id: 4,
    title: 'Draft: New Security Features',
    excerpt: 'An overview of upcoming security features and how to implement them.',
    publishedDate: '',
    author: 'Jordan Wang',
    readTime: '',
    category: 'Security',
    thumbnail: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Draft'
  }
];

// Extended BlogPost type with status
interface ExtendedBlogPost extends BlogPost {
  status: 'Published' | 'Draft';
}

const BlogManage = () => {
  const [blogPosts, setBlogPosts] = useState<ExtendedBlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');
  const [postToDelete, setPostToDelete] = useState<number | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setBlogPosts(mockBlogPosts as ExtendedBlogPost[]);
  }, []);

  const handleDeletePost = () => {
    if (postToDelete) {
      // In a real app, this would be an API call
      setBlogPosts(prev => prev.filter(post => post.id !== postToDelete));
      toast.success("Blog post deleted successfully");
      setPostToDelete(null);
    }
  };

  const handlePublishToggle = (id: number) => {
    // In a real app, this would be an API call
    setBlogPosts(prev => prev.map(post => {
      if (post.id === id) {
        const newStatus = post.status === 'Published' ? 'Draft' : 'Published';
        toast.success(`Blog post ${newStatus === 'Published' ? 'published' : 'unpublished'} successfully`);
        return { ...post, status: newStatus };
      }
      return post;
    }));
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Manage Blog Posts</h1>
            <Link to="/blog/create">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white">
                <PlusCircle size={16} className="mr-2" />
                Create New Post
              </Button>
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                <Input 
                  type="text" 
                  placeholder="Search blog posts..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <Filter size={16} className="mr-2" />
                    {statusFilter === 'All' ? 'All Posts' : `${statusFilter} Posts`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                    All Posts
                    {statusFilter === 'All' && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Published')}>
                    Published
                    {statusFilter === 'Published' && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>
                    Draft
                    {statusFilter === 'Draft' && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Author</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded overflow-hidden mr-2 hidden sm:block">
                              <img 
                                src={post.thumbnail} 
                                alt={post.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="line-clamp-1">{post.title}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{post.category}</TableCell>
                        <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {post.publishedDate || 'Not published'}
                        </TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            post.status === 'Published' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {post.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Link to={`/blog/${post.id}`}>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <span className="sr-only">View</span>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Link to={`/blog/edit/${post.id}`}>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <span className="sr-only">Edit</span>
                                <Edit className="h-4 w-4" />
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0"
                              onClick={() => handlePublishToggle(post.id)}
                            >
                              <span className="sr-only">
                                {post.status === 'Published' ? 'Unpublish' : 'Publish'}
                              </span>
                              {post.status === 'Published' ? 
                                <X className="h-4 w-4" /> : 
                                <Check className="h-4 w-4" />
                              }
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                              onClick={() => setPostToDelete(post.id)}
                            >
                              <span className="sr-only">Delete</span>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                        No blog posts found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Link to="/blog">
              <Button variant="outline">Back to Blog</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={postToDelete !== null} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogManage;
