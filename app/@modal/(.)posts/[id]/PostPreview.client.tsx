'use client';

// import { useQuery } from '@tanstack/react-query';
import Modal from '@/components/Modal/Modal';
// import { fetchPostById, fetchUserById } from '@/lib/api';
// import { useParams, useRouter } from 'next/navigation';

import css from './PostPreview.module.css';

import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '@/lib/api';
import { useParams, useRouter } from 'next/navigation';
// import { User } from '@/types/user';

export default function PostPreviewClient() {
  const router = useRouter();

  const { id } = useParams<{ id: string }>();
  const postQuery = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <>
      <Modal onClose={handleClose}>
        <button className={css.backBtn} onClick={handleClose}>
          ← Back
        </button>
        {postQuery.isSuccess && (
          <div className={css.post}>
            <div className={css.wrapper}>
              <div className={css.header}>
                <h2>{postQuery.data.title}</h2>
              </div>

              <p className={css.content}>{postQuery.data.body}</p>
            </div>
            <p className={css.user}>{postQuery.data.user.name}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
