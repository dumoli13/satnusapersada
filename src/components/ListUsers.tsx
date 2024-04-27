'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, Chip, Skeleton } from '@mui/material';
import { css } from '@/styled-system/css';
import { UserDetail } from '@/src/interface/users';
import { createQueryString } from '@/src/lib/misc';

interface Properties {
  data: UserDetail[];
}

const styles = {
  container: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3xs',
    my: 'large',
    width: 'full',
    overflowX: 'auto',
    scrollbar: 'hidden',
  }),
  row: css({
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '3xs',
    width: 'full',
  }),
};

const ListUsers = ({ data }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get('userId');
  const selectedUser = userId
    ? data.find((item) => item.id.toString() === userId)
    : null;

  const handleClick = (id: number) => {
    router.replace(
      `?${createQueryString({
        searchParams,
        queryObject: {
          userId: selectedUser?.id === id ? '' : id.toString(),
        },
      })}`,
    );
  };

  const halfIndex = Math.ceil(data.length / 2);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {data.slice(0, halfIndex).map((item, index) => (
          <Chip
            key={index}
            avatar={<Avatar alt={item.name} />}
            label={item.name}
            variant={selectedUser?.id === item.id ? 'filled' : 'outlined'}
            color={selectedUser?.id === item.id ? 'primary' : 'default'}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </div>
      <div className={styles.row}>
        {data.slice(halfIndex).map((item, index) => (
          <Chip
            key={index}
            avatar={<Avatar alt={item.name} />}
            label={item.name}
            variant={selectedUser?.id === item.id ? 'filled' : 'outlined'}
            color={selectedUser?.id === item.id ? 'primary' : 'default'}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export const SkeletonListUser = () => (
  <div className={styles.container}>
    {Array(...Array(3)).map((_val, key) => (
      <Skeleton key={key} variant="rounded" height={32} width={100} />
    ))}
  </div>
);

export default ListUsers;
