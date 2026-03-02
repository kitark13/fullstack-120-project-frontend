import TravellerInfo from "@/components/travellers/TravellerInfo/TravellerInfo";

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
      <TravellerInfo />
      {children || saved || own}
    </div>
  );
}
