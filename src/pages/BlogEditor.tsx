import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Save, Image, ArrowLeft, CloudUpload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BlogPost } from "@/components/Blogs";
import RichTextEditor from "@/components/RichTextEditor";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";
import { supportedLanguages } from "@/i18n";
import { Form, FormProvider, useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { useMutationCreateBlog } from "@/hooks/blog/use-mutation-create-blog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutationUploadFile } from "@/hooks/upload/use-mutation-upload";
import { useQueryBlogDetail } from "@/hooks/blog/use-query-blog-detail";
import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";
import { useMutationUpdateBlog } from "@/hooks/blog/use-mutation-update-blog";
import NotionTextEditor from "./NotionTextEditor";
// Extended BlogPost interface with multilingual support
interface MultilingualContent {
  [key: string]: string;
}

interface ExtendedBlogPost
  extends Omit<BlogPost, "title" | "excerpt" | "content" | "readTime"> {
  title: MultilingualContent;
  excerpt: MultilingualContent;
  content?: MultilingualContent;
  readTime: MultilingualContent;
  status?: "Published" | "Draft";
}

const categories = [
  "AI",
  "Development",
  "Productivity",
  "Collaboration",
  "Security",
  "Culture",
];

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = id !== undefined;
  const { t, i18n } = useTranslation();
  const mutationCreateBlog = useMutationCreateBlog();
  const mutationUpdateBlog = useMutationUpdateBlog();
  const mutationUploadFile = useMutationUploadFile();

  const { data, isLoading } = useQueryBlogDetail(id);

  const post = useMemo(() => {
    return data?.data;
  }, [data]);

  const form = useForm({
    values: {
      title: post?.title,
      summary: post?.summary,
      thumbnail: post?.thumbnail,
      content: post?.content ? JSON.parse(post?.content) : undefined,
      language: post?.language,
      category: post?.category,
      publish: post?.publish,
      author: post?.author,
    },
  });
  
  const handleSave = async (status: "Draft" | "Published") => {
    const data = form.getValues();
    if (isEditing) {
      mutationUpdateBlog.mutate({
        ...data,
        content: JSON.stringify(data.content),
        id,
      });
    } else {
      mutationCreateBlog.mutate({
        ...data,
        content: JSON.stringify(data.content),
      });
    }
  };

  if (isLoading && isEditing) {
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
          <div className="max-w-[62rem] mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <Link
                  to="/blog/manage"
                  className="inline-flex items-center text-brand-600 hover:text-brand-700 mb-2 transition-colors"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  {t("blogEditor.backToManagePosts")}
                </Link>
                <h1 className="text-3xl font-bold">
                  {isEditing
                    ? t("blogEditor.editBlogPost")
                    : t("blogEditor.createBlogPost")}
                </h1>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleSave("Draft")}>
                  {t("blogEditor.saveAsDraft")}
                </Button>
                <Button
                  className="bg-brand-600 hover:bg-brand-700 text-white"
                  onClick={() => handleSave("Published")}
                  type="submit"
                  disabled={
                    mutationCreateBlog.status === "pending" ||
                    mutationUpdateBlog.status === "pending"
                  }
                >
                  {mutationCreateBlog.status === "pending" ||
                  mutationUpdateBlog.status === "pending" ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Save size={16} className="mr-2" />
                  )}
                  Save
                </Button>
              </div>
            </div>
            <FormProvider {...form}>
              <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                <div className="grid grid-cols-1 gap-6">
                  {/* Language selector for content */}
                  <FormField
                    name="language"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="contentLanguage">
                            {t("blogEditor.languageSelector")}
                          </FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue("language", value);
                              }}
                            >
                              <SelectTrigger id="contentLanguage">
                                <SelectValue
                                  placeholder={t("blogEditor.selectLanguage")}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {Object.entries(supportedLanguages).map(
                                  ([code, name]) => (
                                    <SelectItem key={code} value={code}>
                                      {t(`language.${name.toLowerCase()}`)}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Title */}
                  <FormField
                    name="title"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="title">
                            {t("blogManage.title")}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              id="title"
                              placeholder={t("blogEditor.titlePlaceholder")}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  {/* Excerpt */}
                  <FormField
                    name="summary"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="excerpt">
                            {t("blogManage.excerpt")}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              id="summary"
                              placeholder={t("blogEditor.excerptPlaceholder")}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Author */}
                    <FormField
                      name="author"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel htmlFor="author">
                              {t("blogManage.author")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id="author"
                                placeholder={t("blogEditor.authorPlaceholder")}
                              />
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />

                    {/* Category */}
                    <FormField
                      name="category"
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel htmlFor="category">
                              {t("blogManage.category")}
                            </FormLabel>
                            <FormControl>
                              <Select {...field}>
                                <SelectTrigger id="category">
                                  <SelectValue
                                    placeholder={t("blogEditor.selectCategory")}
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  {/* Thumbnail URL */}
                  <FormField
                    name="thumbnail"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel htmlFor="thumbnail">
                            {t("blogManage.thumbnail")}
                          </FormLabel>
                          <FormControl>
                            <div>
                              <div className="flex gap-2">
                                <Input
                                  disabled
                                  {...field}
                                  id="thumbnail"
                                  value={field.value}
                                  placeholder={t(
                                    "blogEditor.thumbnailPlaceholder"
                                  )}
                                />
                                <Button
                                  variant="outline"
                                  disabled={
                                    mutationUploadFile.status === "pending"
                                  }
                                  onClick={() => {
                                    const fileInput =
                                      document.createElement("input");
                                    fileInput.type = "file";
                                    fileInput.accept = "image/*";
                                    fileInput.onchange = async (e) => {
                                      const file = (
                                        e.target as HTMLInputElement
                                      ).files?.[0];
                                      if (file) {
                                        const data =
                                          await mutationUploadFile.mutateAsync({
                                            file,
                                          });
                                        const fileURI = `${
                                          import.meta.env.VITE_STORAGE_URL
                                        }/images/${data.data.filename}`;
                                        field.onChange(fileURI);
                                      }
                                    };
                                    fileInput.click();
                                  }}
                                >
                                  {mutationUploadFile.status === "pending" ? (
                                    <Loader2 className="animate-spin" />
                                  ) : (
                                    <CloudUpload size={16} />
                                  )}
                                </Button>
                              </div>
                              {form.getValues()?.thumbnail && (
                                <div className="mt-4 max-h-[260px] w-auto max-w-[60%] overflow-hidden border-gray-300 inline-block">
                                  <img
                                    src={form.getValues()?.thumbnail}
                                    alt={t("blogEditor.thumbnailPreview")}
                                    className="w-auto h-full object-cover rounded-sm max-h-[260px]"
                                    onError={(e) => {
                                      const target =
                                        e.target as HTMLImageElement;
                                      target.src =
                                        "https://placehold.co/600x400?text=Invalid+Image";
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />

                  {/* Content with WYSIWYG editor */}
                  <FormField
                    key={`${post?.id} ${Date.now()}`}
                    name="content"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          {/* <FormLabel htmlFor="content">
                            {t("blogEditor.content")}
                          </FormLabel> */}
                          <FormControl>
                            <NotionTextEditor
                              setValue={field.onChange}
                              value={field.value}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </div>
            </FormProvider>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogEditor;
