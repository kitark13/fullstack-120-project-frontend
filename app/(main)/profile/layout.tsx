"use client";

import ProfilePage from "@/components/profile/ProfilePage/ProfilePage";
import PageToggle from "@/components/profile/PageToggle/PageToggle";

export default function ProfileLayout({
  children,
  saved,
  own,
}: {
  children: React.ReactNode;
  saved: React.ReactNode;
  own: React.ReactNode;
}) {
  return (
    <div className="container">
      <ProfilePage />
      <PageToggle />
      {children || saved || own}
    </div>
  );
}
