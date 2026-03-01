import TravellerInfo from '@/components/travellers/TravellerInfo/TravellerInfo';
import { getStoriesTravellerServer } from '@/lib/api/serverApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ travellerId: string }>;
};
export default async function TravellerDetails({ params }: Props) {
  const { travellerId } = await params;
  //   console.log('note id:', travellerId);
  //   console.log(typeof travellerId);

  //   const traveller = await getStoriesTraveller(travellerId, 1);
  //   console.log('gggg', traveller);

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['traveller-stories', travellerId, 4],
    initialPageParam: 1,

    queryFn: ({ pageParam = 1, queryKey }) => {
      const [, travellerId] = queryKey as [string, string];

      return getStoriesTravellerServer(travellerId, pageParam, 4);
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TravellerInfo travellerId={travellerId} />
    </HydrationBoundary>
  );

  //   return (
  //     <div>
  //       <TravellerInfo
  //         user={traveller.user}
  //         stories={traveller.stories}
  //         travellerId={travellerId}
  //       />
  //     </div>
  //   );
}
