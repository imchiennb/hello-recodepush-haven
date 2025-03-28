import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useQueryBlogDetail } from "@/hooks/blog/use-query-blog-detail";
import { calculateReadingTime } from "@/lib/utils";
import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";

// Mock data with multilingual content
const mockBlogPosts = [
  {
    id: 1,
    title: {
      en: "The Future of Code Collaboration",
      vi: "Tương Lai của Hợp Tác Mã Nguồn",
      ja: "コード協力の未来",
      zh: "代码协作的未来",
    },
    excerpt: {
      en: "Exploring how AI will transform how teams work together on code projects.",
      vi: "Khám phá cách AI sẽ biến đổi cách các nhóm làm việc cùng nhau trên các dự án mã nguồn.",
      ja: "AIがコードプロジェクトでチームの協力方法をどのように変革するかを探ります。",
      zh: "探索人工智能将如何改变团队在代码项目上的协作方式。",
    },
    content: {
      en: `
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
      vi: `
        <p>Bối cảnh phát triển phần mềm đang phát triển nhanh chóng, với trí tuệ nhân tạo sẵn sàng cách mạng hóa cách chúng ta cộng tác về mã. Trong bài viết này, chúng ta sẽ khám phá các xu hướng và công nghệ mới nổi đang định hình lại cộng tác mã.</p>
        
        <h2>Gợi ý Mã Được Hỗ Trợ bởi AI</h2>
        <p>Một trong những tiến bộ đáng kể nhất là sự xuất hiện của các trợ lý AI có thể đề xuất hoàn thiện mã, xác định lỗi và thậm chí tái cấu trúc toàn bộ phần của cơ sở mã của bạn. Các công cụ này phân tích mẫu trên hàng triệu kho lưu trữ để cung cấp các đề xuất phù hợp với ngữ cảnh có thể tăng tốc đáng kể chu kỳ phát triển.</p>
        
        <p>Tác động đặc biệt rõ rệt đối với các nhóm làm việc ở các múi giờ hoặc cấp độ kinh nghiệm khác nhau. Các nhà phát triển junior có thể học các phương pháp tốt nhất ngay lập tức, trong khi các kỹ sư senior có thể tập trung vào kiến trúc và giải quyết vấn đề phức tạp thay vì các nhiệm vụ lập trình lặp đi lặp lại.</p>
        
        <h2>Chỉnh Sửa Cộng Tác Thời Gian Thực</h2>
        <p>Đã qua rồi thời kỳ của các xung đột kiểm soát phiên bản khó khăn. Các nền tảng cộng tác hiện đại hiện cho phép chỉnh sửa đồng thời thực sự, với nhiều nhà phát triển có thể làm việc trên cùng một tệp đồng thời, xem các thay đổi của nhau trong thời gian thực.</p>
        
        <p>Khả năng này giảm thiểu chi phí phối hợp và cho phép lập trình theo cặp từ xa, thúc đẩy chia sẻ kiến thức và giảm thời gian dành để giải quyết xung đột hợp nhất.</p>
        
        <h2>Đánh Giá Mã Tự Động</h2>
        <p>AI cũng đang thay đổi quy trình đánh giá mã. Các hệ thống tự động hiện có thể quét các yêu cầu kéo để xác định các lỗ hổng bảo mật tiềm ẩn, thắt cổ chai hiệu suất và tuân thủ các tiêu chuẩn mã trước khi người đánh giá con người nhìn vào mã.</p>
        
        <p>Điều này không loại bỏ nhu cầu đánh giá của con người mà thay vào đó cho phép các đánh giá đó tập trung vào các mối quan tâm cấp cao hơn như kiến trúc, khả năng bảo trì và tính đúng đắn của logic kinh doanh.</p>
        
        <h2>Nhìn về Tương Lai</h2>
        <p>Khi các công nghệ này trưởng thành, chúng ta có thể mong đợi sự tích hợp sâu hơn giữa AI và quy trình phát triển. Hãy tưởng tượng các hệ thống có thể hiểu ý định đằng sau tài liệu yêu cầu và tạo ra các nguyên mẫu chức năng, hoặc có thể dự đoán khu vực nào trong cơ sở mã của bạn có thể gây ra vấn đề trong tương lai.</p>
        
        <p>Tại RecodePush, chúng tôi đang nắm bắt những thay đổi này và xây dựng các công cụ tăng cường cộng tác mà không thay thế trí thông minh và sáng tạo của con người, những yếu tố thiết yếu cho phát triển phần mềm tuyệt vời.</p>
      `,
      ja: `
        <p>ソフトウェア開発の風景は急速に進化しており、人工知能がコード協力の方法に革命をもたらそうとしています。この記事では、コード協力を再形成している新興のトレンドとテクノロジーを探っていきます。</p>
        
        <h2>AIパワードコード提案</h2>
        <p>最も重要な進歩の一つは、コード補完の提案、バグの特定、さらにはコードベースの全セクションのリファクタリングができるAIアシスタントの台頭です。これらのツールは何百万ものリポジトリにわたるパターンを分析し、開発サイクルを劇的に加速できる文脈的に関連する提案を提供します。</p>
        
        <p>この影響は、異なるタイムゾーンや経験レベルで働くチームにとって特に顕著です。ジュニア開発者はその場でベストプラクティスを学ぶことができ、シニアエンジニアは反復的なコーディングタスクではなく、アーキテクチャや複雑な問題解決に集中できます。</p>
        
        <h2>リアルタイム協力編集</h2>
        <p>扱いにくいバージョン管理の衝突の日々は過ぎ去りました。現代の協力プラットフォームは、複数の開発者が同時に同じファイルで作業し、互いの変更をリアルタイムで見ることができる真の同時編集を可能にします。</p>
        
        <p>この能力は調整のオーバーヘッドを減らし、距離を超えたペアプログラミングを可能にし、知識共有を促進し、マージ衝突の解決に費やす時間を減らします。</p>
        
        <h2>自動コードレビュー</h2>
        <p>AIはコードレビュープロセスも変革しています。自動システムは現在、人間のレビュアーがコードを見る前に、プルリクエストをスキャンして潜在的なセキュリティ脆弱性、パフォーマンスのボトルネック、コーディング標準への準拠を特定できます。</p>
        
        <p>これは人間のレビューの必要性を排除するものではなく、代わりにアーキテクチャ、保守性、ビジネスロジックの正確性などの高レベルの懸念事項にレビューを集中させることができます。</p>
        
        <h2>将来を見据えて</h2>
        <p>これらのテクノロジーが成熟するにつれて、AIと開発ワークフローの間のさらに深い統合を期待できます。要件文書の背後にある意図を理解し、機能的なプロトタイプを生成できるシステム、またはコードベースのどの領域が将来問題を引き起こす可能性があるかを予測できるシステムを想像してください。</p>
        
        <p>RecodePushでは、これらの変化を受け入れ、優れたソフトウェア開発に不可欠な人間の知性と創造性に取って代わることなく、協力を強化するツールを構築しています。</p>
      `,
      zh: `
        <p>软件开发的格局正在迅速发展，人工智能有望彻底改变我们在代码项目上的协作方式。在本文中，我们将探讨正在重塑代码协作的新兴趋势和技术。</p>
        
        <h2>AI驱动的代码建议</h2>
        <p>最显著的进步之一是能够提供代码补全建议、识别错误，甚至重构整个代码库部分的AI助手的兴起。这些工具分析数百万个代码库中的模式，提供上下文相关的建议，可以显著加快开发周期。</p>
        
        <p>对于跨不同时区或经验水平的团队，这种影响尤为明显。初级开发人员可以即时学习最佳实践，而高级工程师可以专注于架构和复杂问题解决，而不是重复的编码任务。</p>
        
        <h2>实时协作编辑</h2>
        <p>笨重的版本控制冲突的日子一去不复返了。现代协作平台现在支持真正的同时编辑，多个开发人员能够同时在同一文件上工作，实时看到彼此的更改。</p>
        
        <p>这种能力减少了协调开销，实现了远程结对编程，促进了知识共享，减少了解决合并冲突所花费的时间。</p>
        
        <h2>自动代码审查</h2>
        <p>AI也在改变代码审查过程。自动化系统现在可以扫描拉取请求，在人类审查者查看代码之前识别潜在的安全漏洞、性能瓶颈和对编码标准的遵守情况。</p>
        
        <p>这并不会消除人工审查的需要，而是允许这些审查专注于架构、可维护性和业务逻辑正确性等更高层次的问题。</p>
        
        <h2>展望未来</h2>
        <p>随着这些技术的成熟，我们可以期待AI与开发工作流程之间更深入的集成。想象一下，系统可以理解需求文档背后的意图并生成功能原型，或者可以预测代码库中哪些区域可能在未来造成问题。</p>
        
        <p>在RecodePush，我们正在拥抱这些变化，并构建能够增强协作的工具，而不是取代对优秀软件开发至关重要的人类智慧和创造力。</p>
      `,
    },
    publishedDate: "2023-09-15",
    author: "Alex Rivera",
    readTime: {
      en: "5 min read",
      vi: "5 phút đọc",
      ja: "5分で読める",
      zh: "5分钟阅读",
    },
    category: "AI",
    thumbnail:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
  // Other blog posts with content...
  {
    id: 2,
    title: {
      en: "Building Scalable Applications with RecodePush",
      vi: "Xây Dựng Ứng Dụng Có Khả Năng Mở Rộng với RecodePush",
      ja: "RecodePushでスケーラブルなアプリケーションを構築する",
      zh: "使用RecodePush构建可扩展的应用程序",
    },
    excerpt: {
      en: "Learn the best practices for scaling your applications using our platform.",
      vi: "Tìm hiểu các phương pháp tốt nhất để mở rộng ứng dụng của bạn bằng nền tảng của chúng tôi.",
      ja: "当社のプラットフォームを使用してアプリケーションをスケーリングするためのベストプラクティスを学びます。",
      zh: "了解使用我们的平台扩展应用程序的最佳实践。",
    },
    content: {
      en: `
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
      vi: `
        <p>Khả năng mở rộng là một trong những khía cạnh quan trọng nhất của phát triển ứng dụng hiện đại. Khi cơ sở người dùng của bạn phát triển, ứng dụng của bạn cần xử lý tải tăng mà không ảnh hưởng đến hiệu suất hoặc độ tin cậy.</p>
        
        <h2>Kiến Trúc Microservices</h2>
        <p>Một trong những cách tiếp cận chính để xây dựng các ứng dụng có khả năng mở rộng là áp dụng kiến trúc microservices. Bằng cách chia nhỏ ứng dụng của bạn thành các dịch vụ độc lập, mỗi dịch vụ chịu trách nhiệm cho một chức năng cụ thể, bạn có thể mở rộng các thành phần riêng lẻ dựa trên nhu cầu thay vì mở rộng toàn bộ ứng dụng.</p>
        
        <p>RecodePush cung cấp hỗ trợ tích hợp cho phát triển microservices, với các công cụ khám phá dịch vụ, cân bằng tải và giao tiếp giữa các dịch vụ.</p>
        
        <h2>Mở Rộng Theo Chiều Ngang</h2>
        <p>Khi thiết kế để mở rộng, ưu tiên mở rộng theo chiều ngang (thêm nhiều máy) hơn là mở rộng theo chiều dọc (thêm nhiều sức mạnh vào máy hiện có). Cách tiếp cận này cho phép khả năng phục hồi lớn hơn và thường có thể hiệu quả về chi phí hơn.</p>
        
        <p>Nền tảng của chúng tôi giúp mở rộng theo chiều ngang dễ dàng với hỗ trợ containerization và cân bằng tải tự động trên các phiên bản.</p>
        
        <h2>Chiến Lược Bộ Nhớ Đệm</h2>
        <p>Việc triển khai bộ nhớ đệm hiệu quả có thể giảm đáng kể tải cơ sở dữ liệu và cải thiện thời gian phản hồi. Xem xét chiến lược bộ nhớ đệm đa lớp, từ bộ nhớ đệm trình duyệt đến bộ nhớ đệm CDN và bộ nhớ đệm ở cấp ứng dụng.</p>
        
        <p>RecodePush tích hợp với các giải pháp bộ nhớ đệm phổ biến và cung cấp hướng dẫn về cấu hình bộ nhớ đệm tối ưu cho các loại ứng dụng khác nhau.</p>
        
        <h2>Tối Ưu Hóa Cơ Sở Dữ Liệu</h2>
        <p>Cơ sở dữ liệu của bạn thường trở thành điểm nghẽn trong các ứng dụng có khả năng mở rộng. Xem xét các chiến lược như bản sao đọc cho khối lượng công việc đọc nhiều, sharding để phân phối dữ liệu trên nhiều cơ sở dữ liệu và sử dụng cơ sở dữ liệu chuyên biệt cho các loại dữ liệu cụ thể.</p>
        
        <p>Nền tảng của chúng tôi hỗ trợ nhiều công nghệ cơ sở dữ liệu và mô hình mở rộng để đảm bảo lớp dữ liệu của bạn có thể theo kịp với sự phát triển của ứng dụng.</p>
      `,
      ja: `
        <p>スケーラビリティは、現代のアプリケーション開発における最も重要な側面の一つです。ユーザーベースが成長するにつれて、アプリケーションはパフォーマンスや信頼性を犠牲にすることなく、増加した負荷を処理する必要があります。</p>
        
        <h2>マイクロサービスアーキテクチャ</h2>
        <p>スケーラブルなアプリケーションを構築するための主要なアプローチの一つは、マイクロサービスアーキテクチャを採用することです。アプリケーションを特定の機能を担当する独立したサービスに分解することで、アプリケーション全体をスケーリングするのではなく、需要に基づいて個々のコンポーネントをスケーリングできます。</p>
        
        <p>RecodePushは、サービスディスカバリー、ロードバランシング、サービス間通信のためのツールを備えたマイクロサービス開発のサポートを内蔵しています。</p>
        
        <h2>水平スケーリング</h2>
        <p>スケールのための設計では、垂直スケーリング（既存のマシンにより多くのパワーを追加する）よりも水平スケーリング（より多くのマシンを追加する）を好みます。このアプローチにより、より高い回復力が可能になり、多くの場合、コスト効率が高くなります。</p>
        
        <p>当社のプラットフォームは、コンテナ化サポートとインスタンス間の自動ロードバランシングにより、水平スケーリングが容易になります。</p>
        
        <h2>キャッシング戦略</h2>
        <p>効果的なキャッシングを実装することで、データベースの負荷を大幅に軽減し、応答時間を改善できます。ブラウザキャッシングからCDNキャッシング、アプリケーションレベルのキャッシングまで、多層キャッシング戦略を検討してください。</p>
        
        <p>RecodePushは、人気のあるキャッシングソリューションと統合し、異なるタイプのアプリケーションのための最適なキャッシング構成に関するガイダンスを提供します。</p>
        
        <h2>データベース最適化</h2>
        <p>データベースは、スケーラブルなアプリケーションでしばしばボトルネックになります。読み取りが多いワークロードのためのリードレプリカ、複数のデータベースにデータを分散するためのシャーディング、特定のタイプのデータのための専門化されたデータベースの使用などの戦略を検討してください。</p>
        
        <p>当社のプラットフォームは、データレイヤーがアプリケーションの成長に対応できるよう、さまざまなデータベース技術とスケーリングパターンをサポートしています。</p>
      `,
      zh: `
        <p>可扩展性是现代应用程序开发中最关键的方面之一。随着用户群的增长，您的应用程序需要在不牺牲性能或可靠性的情况下处理增加的负载。</p>
        
        <h2>微服务架构</h2>
        <p>构建可扩展应用程序的关键方法之一是采用微服务架构。通过将应用程序分解为独立的服务，每个服务负责特定功能，您可以根据需求扩展单个组件，而不是扩展整个应用程序。</p>
        
        <p>RecodePush为微服务开发提供内置支持，包括服务发现、负载均衡和服务间通信工具。</p>
        
        <h2>水平扩展</h2>
        <p>在设计可扩展性时，优先考虑水平扩展（添加更多机器）而不是垂直扩展（为现有机器添加更多能力）。这种方法允许更高的弹性，并且通常更具成本效益。</p>
        
        <p>我们的平台通过容器化支持和跨实例的自动负载均衡，使水平扩展变得简单。</p>
        
        <h2>缓存策略</h2>
        <p>实施有效的缓存可以显著减少数据库负载并改善响应时间。考虑多层缓存策略，从浏览器缓存到CDN缓存再到应用程序级缓存。</p>
        
        <p>RecodePush与流行的缓存解决方案集成，并为不同类型的应用程序提供最佳缓存配置指导。</p>
        
        <h2>数据库优化</h2>
        <p>在可扩展应用程序中，数据库通常成为瓶颈。考虑诸如读取副本（用于读取密集型工作负载）、分片（用于在多个数据库之间分配数据）以及为特定类型的数据使用专门数据库等策略。</p>
        
        <p>我们的平台支持各种数据库技术和扩展模式，确保您的数据层能够跟上应用程序的增长。</p>
      `,
    },
    publishedDate: "2023-08-28",
    author: "Jamie Chen",
    readTime: {
      en: "7 min read",
      vi: "7 phút đọc",
      ja: "7分で読める",
      zh: "7分钟阅读",
    },
    category: "Development",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
  },
];

interface MultilingualContent {
  [key: string]: string;
}

interface MultilingualBlogPost {
  id: number;
  title: MultilingualContent;
  excerpt: MultilingualContent;
  content?: MultilingualContent;
  publishedDate: string;
  author: string;
  readTime: MultilingualContent;
  category: string;
  thumbnail: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const localUser = localStorage.getItem(LOCAL_STORAGE_KEYS.PROFILE);

  const { data, isLoading } = useQueryBlogDetail(id);

  const post = useMemo(() => {
    return data?.data;
  }, [data]);

  if (isLoading) {
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
          <h1 className="text-3xl font-bold mb-4">{t("blog.blogNotFound")}</h1>
          <p className="mb-8">{t("blog.blogDoesntExist")}</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft size={16} className="mr-2" />
              {t("blog.backToBlog")}
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
              <Link
                to="/blog"
                className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-6 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                {t("blog.backToBlog")}
              </Link>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center text-neutral-600 gap-4 mb-6">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center mr-2">
                    <span className="text-sm font-medium">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium">{post.author}</span>
                </div>

                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{post.createdAt}</span>
                </div>

                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>
                    {/* {post.readTime[currentLanguage] || post.readTime.en} */}
                    {calculateReadingTime(post.content)} minutes read
                  </span>
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
              dangerouslySetInnerHTML={{
                __html: post.content || "",
              }}
            />

            {/* Actions */}
            <div className="flex justify-between items-center border-t border-neutral-200 pt-8">
              <Link to="/blog">
                <Button variant="outline">
                  <ArrowLeft size={16} className="mr-2" />
                  {t("blogPost.backToAllArticles")}
                </Button>
              </Link>

              {!!localUser && (
                <Link to={`/blog/edit/${post.id}`}>
                  <Button className="bg-brand-600 hover:bg-brand-700 text-white">
                    <Edit size={16} className="mr-2" />
                    {t("blogPost.editArticle")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
