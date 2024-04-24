'use client';

import { Drawer, Skeleton } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import { UserDetail } from '@/src/interface/users';
import { createQueryString } from '@/src/lib/misc';
import { TodoDetail } from '@/src/interface/todos';
import ButtonEdit from './ButtonEdit';
import ButtonDelete from './ButtonDelete';

const styles = {
  skeleton: css({
    width: 'full',
    display: 'flex',
    gap: 'base',
  }),
  container: css({
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    gap: 'xl',
    padding: 'base',
    lg: {
      width: 'modal-width',
      padding: 'xl',
    },
  }),
  userName: css({
    color: 'light.foreground.50',
    fontSize: 'base',
    marginBottom: '4xs',
  }),
  name: css({
    fontSize: '2xl',
    fontWeight: 'medium',
  }),
  buttonWrapper: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
};

const DetailTab = dynamic(() => import('./DetailTab'), {
  loading: () => (
    <div>
      <div className={styles.skeleton}>
        <Skeleton height={44} width="100%" />
        <Skeleton height={44} width="100%" />
      </div>
      <Skeleton variant="rounded" height={120} />
    </div>
  ),
});

interface Properties {
  data: UserDetail;
  todos: TodoDetail[] | null;
}

const DrawerUserDetail = ({ data, todos }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClose = () => {
    router.replace(
      `?${createQueryString({
        searchParams,
        queryObject: {
          id: '',
        },
      })}`,
    );
  };

  return (
    <Drawer anchor="right" open onClose={handleClose}>
      <DialogHeader title="Worker Detail" onClose={handleClose} />
      <div className={styles.container}>
        <div>
          <p className={styles.userName}>{data.username}</p>
          <p className={styles.name}>{data.name}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <ButtonEdit data={data} />
          <ButtonDelete id={data.id} onClose={handleClose} />
        </div>
        <DetailTab data={data} todos={todos} />
      </div>
    </Drawer>
  );
};

export default DrawerUserDetail;
