'use client';

import React from 'react';
import { Drawer, Skeleton } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import { createQueryString } from '@/src/lib/misc';
import { AlbumDetail } from '@/src/interface/albums';
import { PhotoDetail } from '@/src/interface/photos';
import { UserDetail } from '@/src/interface/users';
import { SkeletonDetailPhoto } from './DetailPhoto';

const ButtonDelete = dynamic(() => import('./ButtonDelete'), {
  loading: () => <Skeleton variant="rounded" height={39} width={122} />,
});
const ButtonEdit = dynamic(() => import('./ButtonEdit'), {
  loading: () => <Skeleton variant="rounded" height={39} width={39} />,
});
const DetailPhoto = dynamic(() => import('./DetailPhoto'), {
  loading: () => <SkeletonDetailPhoto />,
});

interface Properties {
  data: AlbumDetail;
  photos: PhotoDetail[] | null;
  userList: UserDetail[];
}

const styles = {
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
  name: css({
    fontSize: '2xl',
    fontWeight: 'bold',
    mb: '2xs',
  }),
  user: css({
    fontSize: 'small',
    color: 'light.foreground.50',
  }),
  buttonWrapper: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
};

const DrawerAlbumDetail = ({ data, photos, userList }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const user = userList.find((item) => item.id === data.userId);

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
      <DialogHeader title="Album Detail" onClose={handleClose} />
      <div className={styles.container}>
        <div>
          <p className={styles.name}>{data.title}</p>
          {user && <p className={styles.user}>by {user.name}</p>}
        </div>
        <div className={styles.buttonWrapper}>
          <ButtonEdit data={data} userList={userList} />
          <ButtonDelete id={data.id} onClose={handleClose} />
        </div>
        {photos && photos?.length > 0 && <DetailPhoto photos={photos} />}
      </div>
    </Drawer>
  );
};

export default DrawerAlbumDetail;
