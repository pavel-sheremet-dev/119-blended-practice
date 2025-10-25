'use client';

import { useQuery } from '@tanstack/react-query';
// import { useParams, useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';

// import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';

import { fetchPostById } from '@/lib/api';
import { useParams } from 'next/navigation';

// import { User } from '@/types/user';

export default function PostDetailsClient() {
  // const handleClickBack = () => {};

  const { id } = useParams<{ id: string }>();

  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    refetchOnMount: false,
  });

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn}>← Back</button>

            {postQuery.isSuccess && (
              <div className={css.post}>
                <div className={css.wrapper}>
                  <div className={css.header}>
                    <h2>{postQuery.data.title}</h2>
                  </div>

                  <p className={css.content}>{postQuery.data.body}</p>
                </div>
                <p className={css.user}>Author: {postQuery.data.user.name}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
