import { getTopStoriesServer } from "@/lib/api/serverApi";
import { PopularStoriesClient } from "@/components/stories/PopularStories/PopularStories.client";

export async function PopularStories() {
  let isError = false;
  let data = null;
  try {
    data = await getTopStoriesServer(4);
  } catch (error) {
    console.error("Failed to load stories:", error);
    isError = true;
  }

  return (
    <>
      {isError && <p>Failed to load stories...</p>}
      {data && (
        <PopularStoriesClient stories={data.data}></PopularStoriesClient>
      )}
    </>
  );
}
