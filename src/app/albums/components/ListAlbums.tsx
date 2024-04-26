'use client';

import { useState } from 'react';
import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { UserDetail } from '@/src/interface/users';
import ListUsers from './ListUsers';
import { AlbumDetail } from '@/src/interface/albums';
import SNPagination from '@/src/components/SNPagination';
import { PhotoDetail } from '@/src/interface/photos';
import { css } from '@/styled-system/css';

const DrawerAlbumDetail = dynamic(() => import('./DrawerAlbumDetail'));

const CardAlbum = dynamic(() => import('./CardAlbum'), {
  loading: () => <Skeleton height={175} width="100%" />,
});

interface Properties {
  data: Array<AlbumDetail>;
  photoList: Array<PhotoDetail>;
  userList: Array<UserDetail>;
  selectedId?: string;
  albumDetail: AlbumDetail | null;
}

const styles = {
  cardContainer: css({
    display: 'grid',
    gap: 'large',
    gridTemplateColumns: '1',
    md: {
      gridTemplateColumns: '2',
    },
  }),
};

const ListAlbums = ({
  data,
  photoList,
  userList,
  selectedId,
  albumDetail,
}: Properties) => {
  const limit = 8;
  const [page, setPage] = useState(1);

  return (
    <>
      <ListUsers userList={userList} />
      <div className={styles.cardContainer}>
        {data.slice((page - 1) * limit, page * limit).map((item, index) => (
          <CardAlbum
            key={index}
            data={item}
            photos={photoList.filter((photo) => item.id === photo.albumId)}
          />
        ))}
      </div>
      {data.length > limit && (
        <SNPagination
          page={page}
          count={Math.ceil(data.length / limit)}
          onChange={setPage}
        />
      )}
      {selectedId && albumDetail && (
        <DrawerAlbumDetail
          data={albumDetail}
          photos={photoList.filter(
            (photo) => selectedId.toString() === photo.albumId.toString(),
          )}
          userList={userList}
        />
      )}
    </>
  );
};

export default ListAlbums;
