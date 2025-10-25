// import { fetchPosts } from '@/lib/api';

import { fetchPosts } from '@/lib/api';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostsClient from './Posts.client';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const [userId] = slug;
  const searchText = '';
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ['posts', { searchText, page, userId }],
    queryFn: () => fetchPosts({ searchText, page, userId }),
  });

  return (
    <main>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostsClient userId={userId} />
      </HydrationBoundary>
    </main>
  );
}
