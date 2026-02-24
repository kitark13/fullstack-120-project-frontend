

import styles from './page.module.css';
import Block from '../components/Block/Block';
import TravelersList from '../components/travellers/TravellersList/TravellersList';
import PopularStoriesSection from '../components/home/PopularStoriesSection/PopularStoriesSection';
import Join from '../components/home/Join/Join';
import Hero from '@/components/home/Hero/Hero';
import About from '@/components/home/About/About';

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';

import { getUsers } from '@/lib/api/api';

export default async function Home() {
  const queryClient = new QueryClient();

 

  // getUsers prefetch
  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: () => getUsers({}),
  });

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Hero />
        <About />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PopularStoriesSection />
        </HydrationBoundary>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Block title="Наші Мандрівники">
            <TravelersList />
          </Block>
        </HydrationBoundary>
        <Join />
      </main>
    </div>
  );
}