import React from 'react';
import Image from 'next/image';
import { Skeleton } from '@mui/material';
import { PhotoDetail } from '@/src/interface/photos';
import { css } from '@/styled-system/css';

interface Properties {
  photos: Array<PhotoDetail>;
}

const styles = {
  boxContainer: css({
    padding: 'base',
    border: 'neutral',
    borderRadius: 'base',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'base',
  }),
  thumbnail: css({
    borderRadius: 'base',
  }),
};

const DetailPhoto = ({ photos }: Properties) => (
  <div className={styles.boxContainer}>
    {photos.map((item, index) => (
      <Image
        key={index}
        className={styles.thumbnail}
        src={item.url}
        loading="lazy"
        blurDataURL={item.thumbnailUrl}
        width={117}
        height={117}
        alt={item.title}
      />
    ))}
  </div>
);

export const SkeletonDetailPhoto = () => (
  <div className={styles.boxContainer}>
    {Array(...Array(4)).map((_val, key) => (
      <Skeleton variant="rounded" key={key} height={117} width={117} />
    ))}
  </div>
);

export default DetailPhoto;
