export const metadata = { title: "Мої історії" };

export default function OwnLayout({ own }: { own: React.ReactNode }) {
  return <>{own}</>;
}
