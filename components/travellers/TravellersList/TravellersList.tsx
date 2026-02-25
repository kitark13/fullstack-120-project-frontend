import type { User } from "@/types/user";
import { getUsersServer } from "@/lib/api/serverApi";
import { TravellersListClient } from "./TravellersList.client";

export async function TravellersList() {
  const users: User[] = await getUsersServer(4); // рівно 4

  return <TravellersListClient users={users} />;
}
