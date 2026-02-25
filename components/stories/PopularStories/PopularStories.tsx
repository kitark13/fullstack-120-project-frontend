import { getTopStoriesServer } from '@/lib/api/serverApi';

//import styles from './PopularStories.module.css';

import { PopularStoriesClient } from '@/components/stories/PopularStories/PopularStories.client';

export type Author = {
  _id: string;
  name: string;
  avatarUrl: string;
};

export async function PopularStories() {
  const { data } = await getTopStoriesServer(4);

  return <PopularStoriesClient stories={data}></PopularStoriesClient>;
}
