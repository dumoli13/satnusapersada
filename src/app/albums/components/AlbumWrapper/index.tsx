'use client';

import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { css } from '@/styled-system/css';
import { PhotoDetail } from '@/src/interface/photos';
import { AlbumDetail } from '@/src/interface/albums';
// import CardAlbum from './CardAlbum';

const CardAlbum = dynamic(() => import('./CardAlbum'), {
  loading: () => <Skeleton variant="rounded" height={156} width="100%" />,
});

interface Properties {
  data: Array<AlbumDetail>;
  photos: Array<PhotoDetail>;
  userId?: string;
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

const AlbumWrapper = ({ data, photos, userId }: Properties) => (
  <div className={styles.cardContainer}>
    {data
      .filter((item) => (userId ? item.userId.toString() === userId : true))
      .slice(0, 4)
      .map((item, index) => (
        <CardAlbum
          key={index}
          data={item}
          photos={photos.filter((photo) => item.id === photo.albumId)}
        />
      ))}
  </div>
);

export default AlbumWrapper;
