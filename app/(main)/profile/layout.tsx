import ProfilePage from "@/components/profile/ProfilePage/ProfilePage";
import PageToggle from "@/components/profile/PageToggle/PageToggle";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <ProfilePage />
      <PageToggle />
      {children}
    </div>
  );
}
