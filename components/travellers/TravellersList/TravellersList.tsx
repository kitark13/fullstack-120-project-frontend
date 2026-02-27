import { getUsersServer } from "@/lib/api/serverApi";
import { TravellersListClient } from "@/components/travellers/TravellersList/TravellersList.client";

interface TravellersListProps {
  showLoadMore?: boolean;
  variant?: "page" | "section";
}

export async function TravellersList({
  showLoadMore = true,
  variant = "page",
}: TravellersListProps) {
  let isError = false;
  let data = null;

  const initialLimit = variant === "section" ? 4 : 12;

  try {
    data = await getUsersServer(1, initialLimit);
  } catch (error) {
    console.error("Failed to load travellers:", error);
    isError = true;
  }

  if (isError) return <p>Failed to load travellers...</p>;
  if (!data) return null;

  return (
    <>
      <TravellersListClient
        initialUsers={data.data}
        totalPages={data.pagination.total}
        showLoadMore={showLoadMore}
        variant={variant}
      />
    </>
  );
}
