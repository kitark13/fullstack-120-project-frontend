import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getUsersServer } from "@/lib/api/serverApi";
import TravellersGrid from "./TravellersGrid.client";

interface TravellersListProps {
  limit?: number;
  showLoadMore?: boolean;
}

/**
 * Універсальний компонент списку мандрівників.
 * @param limit - скільки завантажити спочатку (за замовчуванням 8)
 * @param showLoadMore - чи показувати кнопку пагінації (за замовчуванням true)
 */
export default async function TravellersList({
  limit = 8,
  showLoadMore = true,
}: TravellersListProps) {
  const queryClient = new QueryClient();

  // Префетчимо дані з вказаним лімітом
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["travellers", limit],
    initialPageParam: 1,
    queryFn: ({ pageParam = 1 }) => getUsersServer(pageParam, limit),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellersGrid initialLimit={limit} showLoadMore={showLoadMore} />
    </HydrationBoundary>
  );
}
