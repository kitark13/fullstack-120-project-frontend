interface TravellerPublicPageProps {
  params: Promise<{ travellerId: string }>;
}

export default async function TravellerPublicPage({
  params,
}: TravellerPublicPageProps) {
  const { travellerId } = await params;

  return (
    <div>
      <h2>Мандрівник {travellerId}</h2>
    </div>
  );
}