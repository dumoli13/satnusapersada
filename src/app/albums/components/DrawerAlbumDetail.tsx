'use client';

import { Button, Drawer, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import { createQueryString } from '@/src/lib/misc';
import DialogConfirmDelete from './DialogConfirmDelete';
import { AlbumDetail } from '@/src/interface/albums';
import { PhotoDetail } from '@/src/interface/photos';
import DialogFormAlbum from './DialogFormAlbum';
import { UserDetail } from '@/src/interface/users';

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
  thumbnail: css({
    borderRadius: 'base',
  }),
  buttonWrapper: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  boxContainer: css({
    padding: 'base',
    border: 'neutral',
    borderRadius: 'base',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'base',
  }),
};

const DrawerAlbumDetail = ({ data, photos, userList }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

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
          <Button onClick={() => setModalEdit(true)} variant="outlined">
            Edit Album
          </Button>
          <IconButton onClick={() => setModalDelete(true)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </div>
        {photos && photos?.length > 0 && (
          <div className={styles.boxContainer}>
            {photos.map((item, index) => (
              <Image
                key={index}
                className={styles.thumbnail}
                src={item.thumbnailUrl}
                width={117}
                height={117}
                alt={item.title}
              />
            ))}
          </div>
        )}
        <DialogFormAlbum
          open={modalEdit}
          data={data}
          userList={userList}
          onClose={() => setModalEdit(false)}
        />
        <DialogConfirmDelete
          open={modalDelete}
          onClose={() => setModalDelete(false)}
          onSuccess={() => {
            setModalDelete(false);
            handleClose();
          }}
          id={data.id}
        />
      </div>
    </Drawer>
  );
};

export default DrawerAlbumDetail;
