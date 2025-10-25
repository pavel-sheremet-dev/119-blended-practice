'use client';

// ./current_folder/file

// ../other_folder/file

import { HydrationBoundary } from '@tanstack/react-query';

const PostPreviewPage = () => {
  // prefetch
  return <HydrationBoundary state={null}>PostPreviewClientComponent</HydrationBoundary>;
};

export default PostPreviewPage;
