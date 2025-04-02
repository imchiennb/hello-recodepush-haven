import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, User, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMutationContact } from "@/hooks/contact/use-mutation-contact";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  const mutationContact = useMutationContact();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    await mutationContact.mutateAsync({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    toast.success(t("Thanks for reaching out! We'll get back to you soon."));
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-neutral-50">
      <div className="container relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-100 text-brand-700 text-sm font-medium">
              {t("nav.contact")}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-100">
                <div className="space-y-5">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-brand-100 p-3 rounded-lg text-brand-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-neutral-900">
                        {t("contact.emailUs")}
                      </h3>
                      <p className="mt-1 text-neutral-600">
                        {t("contact.emailDescription")}
                      </p>
                      <a
                        href="mailto:hello@recodepush.com"
                        className="mt-2 inline-block text-brand-600 hover:text-brand-700 font-medium"
                      >
                        hello@recodepush.com
                      </a>
                    </div>
                  </div>

                  {/* <div className="flex items-start">
                    <div className="flex-shrink-0 bg-brand-100 p-3 rounded-lg text-brand-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-neutral-900">{t('contact.callUs')}</h3>
                      <p className="mt-1 text-neutral-600">{t('contact.callDescription')}</p>
                      <a href="tel:+1-555-123-4567" className="mt-2 inline-block text-brand-600 hover:text-brand-700 font-medium">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div> */}

                  {/* <div className="flex items-start">
                    <div className="flex-shrink-0 bg-brand-100 p-3 rounded-lg text-brand-600">
                      <User className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-neutral-900">{t('contact.visitUs')}</h3>
                      <p className="mt-1 text-neutral-600">{t('contact.visitDescription')}</p>
                      <p className="mt-2 text-neutral-800">
                        100 Technology Drive<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="bg-gradient-to-r from-brand-500 to-brand-700 p-6 rounded-xl text-white">
                <h3 className="text-xl font-semibold mb-3">
                  {t("contact.communityTitle")}
                </h3>
                <p className="mb-4 text-white/90">
                  {t("contact.communityDescription")}
                </p>
                <div className="flex space-x-3">
                  <Button className="bg-white/20 hover:bg-white/30 text-white">
                    Twitter
                  </Button>
                  <Button className="bg-white/20 hover:bg-white/30 text-white">
                    Discord
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white p-8 rounded-xl shadow-sm border border-neutral-100">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.name")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contact.name")} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("contact.email")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your.email@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.phone")}</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (555) 000-0000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("contact.message")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("contact.messagePlaceholder")}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center text-sm text-neutral-600">
                      <CheckCircle className="w-4 h-4 mr-2 text-brand-500" />
                      <span>{t("contact.responseTime")}</span>
                    </div>
                    <Button
                      type="submit"
                      className="bg-brand-600 hover:bg-brand-700 text-white group shadow-lg hover:shadow-xl transition-all"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? t("contact.sending")
                        : t("contact.sendMessage")}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
