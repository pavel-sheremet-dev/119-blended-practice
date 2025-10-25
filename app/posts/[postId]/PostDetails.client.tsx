'use client';

import { useQuery } from '@tanstack/react-query';
// import { useParams, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';

// import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';

import { useParams, useRouter } from 'next/navigation';
import { fetchPostById, fetchUserById, fetchUsers } from '@/lib/api';

export default function PostDetailsClient() {
  const router = useRouter();
  const handleClickBack = () => {
    router.back();
  };
  const { postId } = useParams<{ postId: string }>();

  const { data, isSuccess } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPostById(postId),
  });

  const { data: users, isSuccess: isUserSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  });

  const user = users?.find((user) => user.id === data?.userId);

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn} onClick={handleClickBack}>
              ← Back
            </button>

            {isSuccess && (
              <div className={css.post}>
                <div className={css.wrapper}>
                  <div className={css.header}>
                    <h2>{data.title}</h2>
                  </div>

                  <p className={css.content}>{data.body}</p>
                </div>
                {isUserSuccess && user && <p className={css.user}>Author: {user.name}</p>}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
