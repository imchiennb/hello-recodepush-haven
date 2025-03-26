
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
import { useTranslation } from 'react-i18next';

// Extended mock data for management
const mockBlogPosts = [
  {
    id: 1,
    title: {
      en: 'The Future of Code Collaboration',
      vi: 'Tương Lai của Hợp Tác Mã Nguồn',
      ja: 'コード協力の未来',
      zh: '代码协作的未来'
    },
    excerpt: {
      en: 'Exploring how AI will transform how teams work together on code projects.',
      vi: 'Khám phá cách AI sẽ biến đổi cách các nhóm làm việc cùng nhau trên các dự án mã nguồn.',
      ja: 'AIがコードプロジェクトでチームの協力方法をどのように変革するかを探ります。',
      zh: '探索人工智能将如何改变团队在代码项目上的协作方式。'
    },
    publishedDate: '2023-09-15',
    author: 'Alex Rivera',
    readTime: {
      en: '5 min read',
      vi: '5 phút đọc',
      ja: '5分で読める',
      zh: '5分钟阅读'
    },
    category: 'AI',
    thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  },
  {
    id: 2,
    title: {
      en: 'Building Scalable Applications with RecodePush',
      vi: 'Xây Dựng Ứng Dụng Có Khả Năng Mở Rộng với RecodePush',
      ja: 'RecodePushでスケーラブルなアプリケーションを構築する',
      zh: '使用RecodePush构建可扩展的应用程序'
    },
    excerpt: {
      en: 'Learn the best practices for scaling your applications using our platform.',
      vi: 'Tìm hiểu các phương pháp tốt nhất để mở rộng ứng dụng của bạn bằng nền tảng của chúng tôi.',
      ja: '当社のプラットフォームを使用してアプリケーションをスケーリングするためのベストプラクティスを学びます。',
      zh: '了解使用我们的平台扩展应用程序的最佳实践。'
    },
    publishedDate: '2023-08-28',
    author: 'Jamie Chen',
    readTime: {
      en: '7 min read',
      vi: '7 phút đọc',
      ja: '7分で読める',
      zh: '7分钟阅读'
    },
    category: 'Development',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  },
  {
    id: 3,
    title: {
      en: 'How to Optimize Your Development Workflow',
      vi: 'Làm Thế Nào Để Tối Ưu Hóa Quy Trình Phát Triển Của Bạn',
      ja: '開発ワークフローを最適化する方法',
      zh: '如何优化您的开发工作流程'
    },
    excerpt: {
      en: 'Tips and tricks to streamline your coding process and maximize productivity.',
      vi: 'Mẹo và thủ thuật để đơn giản hóa quy trình lập trình của bạn và tối đa hóa năng suất.',
      ja: 'コーディングプロセスを合理化し、生産性を最大化するためのヒントとコツ。',
      zh: '简化编码过程并最大化生产力的提示和技巧。'
    },
    publishedDate: '2023-08-10',
    author: 'Sam Taylor',
    readTime: {
      en: '4 min read',
      vi: '4 phút đọc',
      ja: '4分で読める',
      zh: '4分钟阅读'
    },
    category: 'Productivity',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    status: 'Published'
  },
  {
    id: 4,
    title: {
      en: 'Draft: New Security Features',
      vi: 'Bản Nháp: Tính Năng Bảo Mật Mới',
      ja: '下書き: 新しいセキュリティ機能',
      zh: '草稿：新安全功能'
    },
    excerpt: {
      en: 'An overview of upcoming security features and how to implement them.',
      vi: 'Tổng quan về các tính năng bảo mật sắp tới và cách triển khai chúng.',
      ja: '今後のセキュリティ機能の概要と実装方法。',
      zh: '即将推出的安全功能概述及其实施方法。'
    },
    publishedDate: '',
    author: 'Jordan Wang',
    readTime: {
      en: '',
      vi: '',
      ja: '',
      zh: ''
    },
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
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  
  useEffect(() => {
    // In a real app, this would be an API call
    const processedPosts = mockBlogPosts.map(post => {
      return {
        ...post,
        title: typeof post.title === 'object' ? (post.title[currentLanguage] || post.title.en) : post.title,
        excerpt: typeof post.excerpt === 'object' ? (post.excerpt[currentLanguage] || post.excerpt.en) : post.excerpt,
        readTime: typeof post.readTime === 'object' ? (post.readTime[currentLanguage] || post.readTime.en) : post.readTime
      };
    }) as ExtendedBlogPost[];
    
    setBlogPosts(processedPosts);
  }, [currentLanguage]);

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
    const titleStr = typeof post.title === 'string' ? post.title : '';
    const matchesSearch = titleStr.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">{t('blogManage.manageBlogPosts')}</h1>
            <Link to="/blog/create">
              <Button className="bg-brand-600 hover:bg-brand-700 text-white">
                <PlusCircle size={16} className="mr-2" />
                {t('blogManage.createNewPost')}
              </Button>
            </Link>
          </div>
          
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
                <Input 
                  type="text" 
                  placeholder={t('blogManage.searchBlogPosts')}
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex-shrink-0">
                    <Filter size={16} className="mr-2" />
                    {statusFilter === 'All' ? t('blogManage.allPosts') : statusFilter === 'Published' ? t('blogManage.publishedPosts') : t('blogManage.draftPosts')}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{t('blogManage.filterByStatus')}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter('All')}>
                    {t('blogManage.allPosts')}
                    {statusFilter === 'All' && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Published')}>
                    {t('blogManage.publishedPosts')}
                    {statusFilter === 'Published' && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('Draft')}>
                    {t('blogManage.draftPosts')}
                    {statusFilter === 'Draft' && <Check className="ml-2 h-4 w-4" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">{t('blogManage.id')}</TableHead>
                    <TableHead>{t('blogManage.title')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('blogManage.category')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('blogManage.author')}</TableHead>
                    <TableHead className="hidden md:table-cell">{t('blogManage.date')}</TableHead>
                    <TableHead>{t('blogManage.status')}</TableHead>
                    <TableHead className="text-right">{t('blogManage.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => {
                      const postTitle = typeof post.title === 'string' ? post.title : '';
                      return (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded overflow-hidden mr-2 hidden sm:block">
                                <img 
                                  src={post.thumbnail} 
                                  alt={postTitle}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="line-clamp-1">{postTitle}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{post.category}</TableCell>
                          <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {post.publishedDate || t('blogManage.notPublished')}
                          </TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              post.status === 'Published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {post.status === 'Published' ? t('blogManage.published') : t('blogManage.draft')}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Link to={`/blog/${post.id}`}>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                  <span className="sr-only">{t('blogManage.view')}</span>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              <Link to={`/blog/edit/${post.id}`}>
                                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                  <span className="sr-only">{t('blogManage.edit')}</span>
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
                                  {post.status === 'Published' ? t('blogManage.unpublish') : t('blogManage.publish')}
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
                                <span className="sr-only">{t('blogManage.delete')}</span>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-neutral-500">
                        {t('blog.noBlogsFound')}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Link to="/blog">
              <Button variant="outline">{t('blogManage.backToBlog')}</Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={postToDelete !== null} onOpenChange={(open) => !open && setPostToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('blogManage.deleteConfirmation')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('blogManage.deleteWarning')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('blogManage.cancel')}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeletePost}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {t('blogManage.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogManage;
