import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { fetchPosts } from '@/lib/api';

import PostsClient from './Posts.client';

interface PostsPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { slug } = await params;

  const userId = slug[0];
  const searchQuery = '';
  const currentPage = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['posts', searchQuery, currentPage, userId],
    queryFn: () =>
      fetchPosts({
        searchText: searchQuery,
        page: currentPage,
        ...(userId !== 'All' && { userId }),
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostsClient userId={userId} />
    </HydrationBoundary>
  );
}
