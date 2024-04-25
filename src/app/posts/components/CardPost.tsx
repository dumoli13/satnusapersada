'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';
import { createQueryString } from '@/src/lib/misc';
import { PostDetail } from '@/src/interface/posts';

interface Properties {
  data: PostDetail;
  user?: UserDetail;
}
const styles = {
  container: css({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 'small',
    padding: 'base',
    marginBottom: '2xl',
    borderY: 'info',
    breakInside: 'avoid',
    _hover: {
      background: 'info.10',
    },
  }),
  title: css({
    fontSize: 'base',
    fontWeight: 'semibold',
    color: 'light.foreground.70',
  }),
  body: css({
    fontSize: 'small',
    color: 'light.foreground.70',
  }),
  author: css({
    fontSize: 'xs',
    color: 'light.foreground.60',
  }),
};

const CardPost = ({ data, user }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = () => {
    router.replace(
      `?${createQueryString({
        searchParams,
        queryObject: {
          id: data.id.toString(),
        },
      })}`,
    );
  };

  return (
    <div className={styles.container} onClick={handleOpen}>
      <h2 className={styles.title}>{data.title}</h2>
      <p className={styles.body}>{data.body}</p>
      {user && <p className={styles.author}>by {user.name}</p>}
    </div>
  );
};

export default CardPost;
