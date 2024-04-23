'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Avatar, Chip } from '@mui/material';
import { css } from '@/styled-system/css';
import { UserDetail } from '@/src/interface/users';
import { createQueryString } from '@/src/lib/misc';

interface Properties {
  userList: UserDetail[];
}

const styles = {
  container: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3xs',
    py: 'large',
  }),
};

const ListUser = ({ userList }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userId = searchParams.get('userId');
  const selectedUser = userId
    ? userList.find((item) => item.id.toString() === userId)
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

  return (
    <div className={styles.container}>
      {userList.map((item, index) =>
        selectedUser?.id === item.id ? (
          <Chip
            key={index}
            avatar={<Avatar alt={item.name} />}
            label={item.name}
            variant="filled"
            color="primary"
            onClick={() => handleClick(item.id)}
          />
        ) : (
          <Chip
            key={index}
            avatar={<Avatar alt={item.name} />}
            label={item.name}
            variant="outlined"
            onClick={() => handleClick(item.id)}
          />
        ),
      )}
    </div>
  );
};

export default ListUser;
