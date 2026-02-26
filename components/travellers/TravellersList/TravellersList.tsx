import { getUsersServer } from "@/lib/api/serverApi";
import { TravellersListClient } from "@/components/travellers/TravellersList/TravellersList.client";

export async function TravellersList() {
  let isError = false;
  let data = null;

  try {
    data = await getUsersServer(4);
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
      />
    </>
  );
}

// const users: User[] = await getUsersServer(4);

// return <TravellersListClient users={users} />;
