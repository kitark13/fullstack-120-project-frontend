import { redirect } from "next/navigation";

export const metadata = {
  title: "Мій профіль",
};

export default function ProfilePage() {
  redirect("/profile/saved");
}
