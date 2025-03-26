
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BlogPost } from '@/components/Blogs';
import RichTextEditor from '@/components/RichTextEditor';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { supportedLanguages } from '@/i18n';

// Sample mock data with multilingual support
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
    content: {
      en: '<p>The landscape of software development is rapidly evolving...</p>',
      vi: '<p>Bối cảnh phát triển phần mềm đang phát triển nhanh chóng...</p>',
      ja: '<p>ソフトウェア開発の風景は急速に進化しています...</p>',
      zh: '<p>软件开发的格局正在迅速发展...</p>'
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
  // Other posts would be here
];

// Extended BlogPost interface with multilingual support
interface MultilingualContent {
  [key: string]: string;
}

interface ExtendedBlogPost extends Omit<BlogPost, 'title' | 'excerpt' | 'content' | 'readTime'> {
  title: MultilingualContent;
  excerpt: MultilingualContent;
  content?: MultilingualContent;
  readTime: MultilingualContent;
  status?: 'Published' | 'Draft';
}

const categories = ['AI', 'Development', 'Productivity', 'Collaboration', 'Security', 'Culture'];

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  const { user } = useAuth();
  const { t, i18n } = useTranslation();
  
  const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language || 'en');
  
  const emptyMultilingualContent = Object.keys(supportedLanguages).reduce((acc, lang) => {
    acc[lang] = '';
    return acc;
  }, {} as MultilingualContent);
  
  const emptyReadTime = Object.keys(supportedLanguages).reduce((acc, lang) => {
    acc[lang] = '';
    return acc;
  }, {} as MultilingualContent);
  
  const [post, setPost] = useState<ExtendedBlogPost>({
    id: 0,
    title: { ...emptyMultilingualContent },
    excerpt: { ...emptyMultilingualContent },
    content: { ...emptyMultilingualContent },
    publishedDate: new Date().toISOString().split('T')[0],
    author: user?.name || '',
    readTime: { ...emptyReadTime },
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
          setPost(foundPost as unknown as ExtendedBlogPost);
        }
        setLoading(false);
      }, 500);
    } else if (user) {
      // Set the author to the logged-in user for new posts
      setPost(prev => ({
        ...prev,
        author: user.name
      }));
    }
  }, [id, isEditing, user]);
  
  const handleInputChange = (field: keyof ExtendedBlogPost, value: any) => {
    setPost(prev => ({ ...prev, [field]: value }));
  };
  
  const handleLocalizedInputChange = (field: 'title' | 'excerpt' | 'content', language: string, value: string) => {
    setPost(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [language]: value
      }
    }));
  };
  
  const calculateReadTime = useCallback((content: string) => {
    // Simple algorithm: average reading speed is ~225 words per minute
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 225);
    
    const readTimes = {
      en: `${minutes} min read`,
      vi: `${minutes} phút đọc`,
      ja: `${minutes}分で読める`,
      zh: `${minutes}分钟阅读`
    };
    
    return readTimes;
  }, []);
  
  useEffect(() => {
    // Auto-calculate read time when content changes
    if (post.content) {
      const contentToCalculate = post.content[currentLanguage] || '';
      if (contentToCalculate) {
        const readTimes = calculateReadTime(contentToCalculate);
        setPost(prev => ({ 
          ...prev, 
          readTime: {
            ...prev.readTime,
            ...readTimes
          }
        }));
      }
    }
  }, [post.content, currentLanguage, calculateReadTime]);
  
  const handleSave = async (status: 'Draft' | 'Published') => {
    if (!post.title[currentLanguage]) {
      toast.error(t('blogEditor.titleRequired'));
      return;
    }
    
    if (!post.content?.[currentLanguage]) {
      toast.error(t('blogEditor.contentRequired'));
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
        ? status === 'Published' ? t('blogEditor.publishedSuccess') : t('blogEditor.savedAsDraft')
        : status === 'Published' ? t('blogEditor.publishedSuccess') : t('blogEditor.savedAsDraft')
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
                  {t('blogEditor.backToManagePosts')}
                </Link>
                <h1 className="text-3xl font-bold">
                  {isEditing ? t('blogEditor.editBlogPost') : t('blogEditor.createBlogPost')}
                </h1>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleSave('Draft')}
                  disabled={saving}
                >
                  {t('blogEditor.saveAsDraft')}
                </Button>
                <Button 
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => handleSave('Published')}
                  disabled={saving}
                >
                  <Save size={16} className="mr-2" />
                  {saving ? t('blogEditor.saving') : t('blogEditor.publish')}
                </Button>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 gap-6">
                {/* Language selector for content */}
                <div>
                  <Label htmlFor="contentLanguage">{t('blogEditor.languageSelector')}</Label>
                  <Select
                    value={currentLanguage}
                    onValueChange={setCurrentLanguage}
                  >
                    <SelectTrigger id="contentLanguage">
                      <SelectValue placeholder={t('blogEditor.selectLanguage')} />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(supportedLanguages).map(([code, name]) => (
                        <SelectItem key={code} value={code}>
                          {t(`language.${name.toLowerCase()}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Title */}
                <div>
                  <Label htmlFor="title">{t('blogManage.title')}</Label>
                  <Input 
                    id="title"
                    placeholder={t('blogEditor.titlePlaceholder')}
                    value={post.title[currentLanguage] || ''}
                    onChange={(e) => handleLocalizedInputChange('title', currentLanguage, e.target.value)}
                  />
                </div>
                
                {/* Excerpt */}
                <div>
                  <Label htmlFor="excerpt">{t('blogManage.excerpt')}</Label>
                  <Textarea 
                    id="excerpt"
                    placeholder={t('blogEditor.excerptPlaceholder')}
                    value={post.excerpt[currentLanguage] || ''}
                    onChange={(e) => handleLocalizedInputChange('excerpt', currentLanguage, e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Author */}
                  <div>
                    <Label htmlFor="author">{t('blogManage.author')}</Label>
                    <Input 
                      id="author"
                      placeholder={t('blogEditor.authorPlaceholder')}
                      value={post.author}
                      onChange={(e) => handleInputChange('author', e.target.value)}
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <Label htmlFor="category">{t('blogManage.category')}</Label>
                    <Select
                      value={post.category}
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder={t('blogEditor.selectCategory')} />
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
                  <Label htmlFor="thumbnail">{t('blogManage.thumbnail')}</Label>
                  <Input 
                    id="thumbnail"
                    placeholder={t('blogEditor.thumbnailPlaceholder')}
                    value={post.thumbnail}
                    onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                  />
                  {post.thumbnail && (
                    <div className="mt-2 h-32 w-full sm:w-64 rounded overflow-hidden">
                      <img 
                        src={post.thumbnail} 
                        alt={t('blogEditor.thumbnailPreview')} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400?text=Invalid+Image';
                        }}
                      />
                    </div>
                  )}
                </div>
                
                {/* Content with WYSIWYG editor */}
                <div>
                  <Label htmlFor="content">{t('blogEditor.content')}</Label>
                  <RichTextEditor 
                    value={post.content?.[currentLanguage] || ''}
                    onChange={(value) => handleLocalizedInputChange('content', currentLanguage, value)}
                    placeholder={`${t(`language.${supportedLanguages[currentLanguage].toLowerCase()}`)} ${t('blogEditor.content')}`}
                  />
                </div>
                
                {/* Read Time (calculated automatically, shown for reference) */}
                <div>
                  <Label>{t('blogEditor.estimatedReadTime')}</Label>
                  <div className="text-sm text-neutral-500 bg-neutral-50 py-2 px-3 border rounded">
                    {post.readTime?.[currentLanguage] || t('blogEditor.willBeCalculated')}
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
