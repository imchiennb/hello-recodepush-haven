
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Mock data with multilingual support
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
    thumbnail: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
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
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
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
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  }
];

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
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';
  
  useEffect(() => {
    // In a real app, this would be an API call
    // Only get the 3 most recent posts
    const processedPosts = mockBlogPosts.slice(0, 3).map(post => {
      return {
        ...post,
        title: typeof post.title === 'object' ? post.title[currentLanguage] || post.title.en : post.title,
        excerpt: typeof post.excerpt === 'object' ? post.excerpt[currentLanguage] || post.excerpt.en : post.excerpt,
        readTime: typeof post.readTime === 'object' ? post.readTime[currentLanguage] || post.readTime.en : post.readTime
      };
    });
    
    setBlogPosts(processedPosts);
  }, [currentLanguage]);

  return (
    <section id="blogs" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('blog.latestFromBlog')}</h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            {t('blog.stayUpdated')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.thumbnail} 
                  alt={typeof post.title === 'string' ? post.title : ''} 
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
                    {t('blog.readArticle')}
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
              {t('blog.viewAllArticles')}
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
