"use client";

import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Input } from "src/components/ui/input";
import { Button } from "src/components/ui/button/button";
import { useTranslations } from "next-intl";
import { DragAndDrop } from "src/components/ui/drag-and-drop";
import { useGetUser } from "src/queries/useGetUser";
import { useEffect, useMemo } from "react";
import SocialList from "./SocialList";
import { Spinner } from "src/components/ui/spinner";
import { useEditUser } from "src/widgets/auth/model/useEditUser";

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  avatar: string | number | null;
};

type UpdateUserData = {
  name: string;
  surname: string;
  file_id?: number;
};

export default function InfluencerProfileForm() {
  const t = useTranslations();
  const { user, userLoading } = useGetUser();
  const { editUserProfile, pendingEditUser } = useEditUser();

  const methods = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      avatar: null,
    },
  });
  const avatar = useWatch({
    control: methods.control,
    name: "avatar",
  });
  const firstName = useWatch({
    control: methods.control,
    name: "firstName",
  });
  const lastName = useWatch({
    control: methods.control,
    name: "lastName",
  });

  const isNoChange = useMemo(() => {
    if (user) {
      return (
        firstName === user.name &&
        lastName === user.surname &&
        avatar === user.icon?.link
      );
    }
    return true;
  }, [firstName, lastName, user, avatar]);

  useEffect(() => {
    if (user) {
      methods.reset({
        firstName: user.name,
        lastName: user.surname,
        avatar: user.icon?.link || null,
      });
    }
  }, [user, methods]);

  const onSubmit = (form: ProfileFormValues) => {
    const data: UpdateUserData = {
      name: form.firstName,
      surname: form.lastName,
    };

    if (form.avatar && typeof form.avatar === "number") {
      data.file_id = form.avatar;
    }

    editUserProfile(data);
  };

  if (!user || userLoading)
    return (
      <div className="flex flex-col gap-[24px] md:shadow-cardShadow md:rounded-[12px] md:p-[24px] px-[12px] py-[24px] bg-white w-full h-[600px] justify-center items-center">
        <Spinner size="small" color="dark" />
      </div>
    );

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-[24px] md:shadow-cardShadow md:rounded-[12px] md:p-[24px] px-[12px] py-[24px] bg-white w-full"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="text-[20px] font-bold mb-4 hidden lg:block">
          {t("settings.profile.title")}
        </div>
        <div>
          <div className="text-[16px] font-bold mb-[10px]">
            {t("settings.profile.avatar.title")}
          </div>
          <DragAndDrop name="avatar" type="image" />
        </div>
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-center gap-2 mb-2">
            <Input
              className="w-full"
              name="email"
              icon="/static/icons/email.svg"
              placeholder={t("common.email")}
              value={user?.email}
              disabled
            />
          </div>
          <div className="flex gap-2 mb-4 w-full">
            <Input
              className="w-full"
              name="firstName"
              icon="/static/icons/name.svg"
              placeholder={t("common.firstname")}
            />
            <Input
              className="w-full"
              name="lastName"
              icon="/static/icons/last-name.svg"
              placeholder={t("common.surname")}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={pendingEditUser || isNoChange}
          loading={pendingEditUser}
        >
          {t("settings.profile.save")}
        </Button>
        <hr className="border-b-[#B3B7BD] border-dashed block w-full" />
        <div>
          <div className="text-base font-semibold mb-3">
            {t("settings.profile.socialAccounts.title")}
          </div>
          <SocialList />
        </div>
      </form>
    </FormProvider>
  );
}
