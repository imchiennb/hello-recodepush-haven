import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Save, Image, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost } from '@/components/Blogs';

// Rich text editor component
const RichTextEditor = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
  return (
    <div className="border rounded-md">
      <div className="flex items-center gap-1 px-3 py-2 border-b bg-neutral-50">
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Insert Image">
          <Image className="h-4 w-4" />
        </Button>
        {/* More toolbar buttons would go here */}
      </div>
      <Textarea 
        className="min-h-[400px] border-none rounded-none focus-visible:ring-0 resize-none"
        placeholder="Write your blog post content here..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
};

// Sample mock data
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Future of Code Collaboration',
    excerpt: 'Exploring how AI will transform how teams work together on code projects.',
    content: '<p>The landscape of software development is rapidly evolving...</p>',
    publishedDate: '2023-09-15',
    author: 'Alex Rivera',
    readTime: '5 min read',
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  },
  // Other posts would be here
];

interface ExtendedBlogPost extends BlogPost {
  content?: string;
  status?: 'Published' | 'Draft';
}

const categories = ['AI', 'Development', 'Productivity', 'Collaboration', 'Security', 'Culture'];

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  
  const [post, setPost] = useState<ExtendedBlogPost>({
    id: 0,
    title: '',
    excerpt: '',
    content: '',
    publishedDate: new Date().toISOString().split('T')[0],
    author: '',
    readTime: '',
    category: '',
    thumbnail: '',
    status: 'Draft'
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  
  useEffect(() => {
    if (isEditing) {
      // In a real app, this would be an API call
      setLoading(true);
      setTimeout(() => {
        const foundPost = mockBlogPosts.find(p => p.id === Number(id));
        if (foundPost) {
          setPost(foundPost as ExtendedBlogPost);
        }
        setLoading(false);
      }, 500);
    }
  }, [id, isEditing]);
  
  const handleInputChange = (field: keyof ExtendedBlogPost, value: string) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };
  
  const calculateReadTime = useCallback((content: string) => {
    // Simple algorithm: average reading speed is ~225 words per minute
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 225);
    return `${minutes} min read`;
  }, []);
  
  useEffect(() => {
    // Auto-calculate read time when content changes
    if (post.content) {
      const readTime = calculateReadTime(post.content);
      setPost(prev => ({ ...prev, readTime }));
    }
  }, [post.content, calculateReadTime]);
  
  const handleSave = async (status: 'Draft' | 'Published') => {
    if (!post.title) {
      toast.error("Title is required");
      return;
    }
    
    if (!post.content) {
      toast.error("Content is required");
      return;
    }
    
    // In a real app, this would be an API call
    setSaving(true);
    setTimeout(() => {
      // Update the post in our mock data
      const updatedPost = {
        ...post,
        status,
        id: isEditing ? Number(id) : Date.now(), // Generate a new ID if creating
        publishedDate: status === 'Published' ? new Date().toISOString().split('T')[0] : ''
      };
      
      toast.success(isEditing 
        ? `Blog post ${status === 'Published' ? 'published' : 'saved as draft'} successfully`
        : `New blog post ${status === 'Published' ? 'published' : 'saved as draft'} successfully`
      );
      
      setSaving(false);
      
      // Navigate back to the blog management page
      navigate('/blog/manage');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="container mx-auto pt-32 pb-20 px-4 flex justify-center items-center">
          <div className="animate-pulse text-center">
            <div className="h-10 w-64 bg-neutral-200 rounded mb-4 mx-auto"></div>
            <div className="h-64 w-full max-w-3xl bg-neutral-200 rounded mx-auto"></div>
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
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <Link to="/blog/manage" className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-2 transition-colors">
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Manage Posts
                </Link>
                <h1 className="text-3xl font-bold">
                  {isEditing ? 'Edit Blog Post' : 'Create Blog Post'}
                </h1>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleSave('Draft')}
                  disabled={saving}
                >
                  Save as Draft
                </Button>
                <Button 
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => handleSave('Published')}
                  disabled={saving}
                >
                  <Save size={16} className="mr-2" />
                  {saving ? 'Saving...' : 'Publish'}
                </Button>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 gap-6">
                {/* Title */}
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title"
                    placeholder="Enter blog post title"
                    value={post.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                
                {/* Excerpt */}
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea 
                    id="excerpt"
                    placeholder="Brief summary of the post"
                    value={post.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Author */}
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input 
                      id="author"
                      placeholder="Enter author name"
                      value={post.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={post.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Thumbnail URL */}
                <div>
                  <Label htmlFor="thumbnail">Thumbnail URL</Label>
                  <Input 
                    id="thumbnail"
                    placeholder="Enter image URL"
                    value={post.thumbnail}
                    onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                  />
                  {post.thumbnail && (
                    <div className="mt-2 h-32 w-full sm:w-64 rounded overflow-hidden">
                      <img 
                        src={post.thumbnail} 
                        alt="Thumbnail preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400?text=Invalid+Image';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div>
                  <Label htmlFor="content">Content</Label>
                  <RichTextEditor 
                    value={post.content || ''}
                    onChange={(value) => handleInputChange('content', value)}
                  />
                </div>
                
                {/* Read Time (calculated automatically, shown for reference) */}
                <div>
                  <Label>Estimated Read Time</Label>
                  <div className="text-sm text-neutral-500 bg-neutral-50 py-2 px-3 border rounded">
                    {post.readTime || 'Will be calculated from content'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogEditor;
