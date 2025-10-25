import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostDetailsClient from './PostDetails.client';
import { fetchPostById } from '@/lib/api';
// import { fetchPostById } from '@/lib/api';

interface PostDetailsProps {
  params: Promise<{ postId: string }>;
}

export default async function PostDetails({ params }: PostDetailsProps) {
  const { postId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostDetailsClient />
    </HydrationBoundary>
  );
}
