import { getStoriesByCategoryServer } from '@/lib/api/serverApi';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { StoriesClient } from './Stories.client';

export default async function Stories() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['stories', 'all', 9],
    queryFn: ({ pageParam = 1 }) =>
      getStoriesByCategoryServer({
        limit: 9,
        page: pageParam,
        category: null,
      }),
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesClient />
    </HydrationBoundary>
  );
}
