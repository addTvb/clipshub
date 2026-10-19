"use client";

import { useTranslations, useLocale } from "next-intl";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import toast from "react-hot-toast";

import { Input } from "src/components/ui/input";
import { Textarea } from "src/components/ui/textarea";
import { Button } from "src/components/ui/button/button";
import CategoryBadge from "src/components/ui/category/category-badge";
import { useBusinessCategory } from "src/queries/business/dictionaries/useBusinessCategory";
import {
  contactUsSchema,
  ContactUsFormData,
  transformFormDataToApi,
} from "./model/contact-us-schemas";
import { useContactUs } from "src/queries/business/useContactUs";
import { ContactLangSelect } from "./ContactLangSelect";

export default function ContactUsForm() {
  const t = useTranslations("business.landing.contactUs");
  const locale = useLocale();
  const { businessCategories, loadingCategories } = useBusinessCategory();

  const { submitContactUs, isPending } = useContactUs({
    onSuccess: () => {
      toast.success(t("success"));
      methods.reset({
        email: "",
        phone: "",
        brandName: "",
        messenger: "",
        about: "",
        categories: [],
        language: locale,
      });
    },
  });

  const methods = useForm<ContactUsFormData>({
    resolver: valibotResolver(contactUsSchema) as Resolver<ContactUsFormData>,
    defaultValues: {
      email: "",
      phone: "",
      brandName: "",
      messenger: "",
      about: "",
      categories: [],
      language: locale,
    },
    mode: "onSubmit",
  });

  const selectedCategories = methods.watch("categories");
  const selectedLanguage = methods.watch("language");

  const toggleCategory = (categoryId: number) => {
    const currentCategories = selectedCategories ?? [];
    const isSelected = currentCategories.includes(categoryId);

    let newCategories: number[];
    if (isSelected) {
      newCategories = currentCategories.filter((id) => id !== categoryId);
    } else {
      newCategories = [...currentCategories, categoryId];
    }

    methods.setValue("categories", newCategories, { shouldDirty: true });
  };

  const onSubmit = (data: ContactUsFormData) => {
    // Дополнительная проверка на всякий случай
    const hasEmail = Boolean(data.email && data.email.trim() !== "");
    const hasPhone = Boolean(data.phone && data.phone.trim() !== "");

    if (!hasEmail && !hasPhone) {
      methods.setError("root", {
        type: "manual",
        message: t("formError"),
      });
      return;
    }

    // Преобразуем данные формы в формат API
    const apiData = transformFormDataToApi(data);
    submitContactUs(apiData);
  };

  return (
    <div className="bg-dark100 rounded-[24px] p-[24px] lg:p-[48px] w-full lg:max-w-[615px]">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col md:gap-[18px] gap-[12px]"
        >
          {/* Contact Us title */}
          <div className="mb-[6px]">
            <h3 className="text-white lg:text-[40px] md:text-[28px] text-[20px] font-bold leading-tight lg:text-left text-center">
              {t("formTitle")}
            </h3>
          </div>

          {/* Email / Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <Input
              name="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              variant="dark"
              icon="/static/icons/email-gray.svg"
            />
            <Input
              name="phone"
              type="tel"
              placeholder={t("phonePlaceholder")}
              variant="dark"
              icon="/static/icons/phone-gray.svg"
            />
          </div>

          {/* Brand Name / Telegram / WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
            <Input
              name="brandName"
              placeholder={t("brandNamePlaceholder")}
              variant="dark"
              icon="/static/icons/company-gray.svg"
            />
            <Input
              name="messenger"
              placeholder={t("telegramPlaceholder")}
              variant="dark"
              icon="/static/icons/telegram-whatsapp.svg"
            />
          </div>

          {/* About Brand */}
          <div className="flex flex-col gap-[10px]">
            <label className="text-white text-[16px] font-bold">
              {t("aboutLabel")}
            </label>
            <Textarea
              name="about"
              rows={5}
              placeholder={t("aboutPlaceholder")}
              variant="dark"
              textareaClassName="resize-none"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-[10px]">
            <div className="text-white text-[16px] font-bold">
              {t("categoriesLabel")}
            </div>
            {loadingCategories ? (
              <div className="text-white/60 text-sm">
                {t("loadingCategories")}
              </div>
            ) : (
              <div className="flex flex-wrap gap-[10px]">
                {businessCategories?.map((category) => {
                  const isSelected = selectedCategories?.includes(category.id);
                  return (
                    <CategoryBadge
                      key={category.id}
                      name={category.name}
                      iconPath={category.icon}
                      variant={isSelected ? "active" : "dark"}
                      onClick={() => toggleCategory(category.id)}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Form Error */}
          {methods.formState.errors.root && (
            <div className="text-red-500 text-sm text-center">
              {methods.formState.errors.root.message}
            </div>
          )}

          {/* Submit Button */}
          <div className="flex gap-[12px] sm:items-center pt-[6px] flex-col sm:flex-row">
            <ContactLangSelect
              value={selectedLanguage}
              onChange={(value) => methods.setValue("language", value)}
            />

            <Button
              type="submit"
              variant="outline"
              disabled={isPending}
              className="w-full bg-white text-textColor font-bold border-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed h-full"
            >
              {isPending ? t("sending") : t("sendButton")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
