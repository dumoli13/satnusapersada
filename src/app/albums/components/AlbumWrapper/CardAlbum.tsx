'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { css } from '@/styled-system/css';
import { AlbumDetail } from '@/src/interface/albums';
import { createQueryString } from '@/src/lib/misc';
import { PhotoDetail } from '@/src/interface/photos';

interface Properties {
  data: AlbumDetail;
  photos: Array<PhotoDetail>;
}

const styles = {
  root: css({
    cursor: 'pointer',
    border: 'neutral',
    borderRadius: 'base',
    px: 'base',
    py: 'small',
  }),
  titleContainer: css({
    display: 'flex',
    justifyContent: 'space-between',
    gap: 'base',
    mb: 'small',
  }),
  title: css({
    fontWeight: 'semibold',
    fontSize: 'base',
  }),
  imageContainer: css({
    display: 'grid',
    gridTemplateRows: '1',
    gap: 'base',
    overflow: 'scroll',
    scrollbar: 'hidden',
  }),
  thumbnail: css({
    borderRadius: 'base',
  }),
  placeholder: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8xl',
    width: '8xl',
    color: 'light.foreground.10',
    background: 'light.background.10',
  }),
  emptyList: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8xl',
    fontStyle: 'italic',
    color: 'light.foreground.50',
  }),
};

const CardAlbum = ({ data, photos }: Properties) => {
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
    <div className={styles.root} onClick={handleOpen}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{data.title}</h2>
        <ChevronRightIcon color="action" />
      </div>
      <div
        className={styles.imageContainer}
        style={{
          gridTemplateColumns: 'repeat(5, calc((100% - 8px * 4) / 5))',
        }}
      >
        {photos.length > 0 ? (
          photos
            .slice(0, 5)
            .map((item, index) => (
              <Image
                key={index}
                className={styles.thumbnail}
                src={item.thumbnailUrl}
                width={120}
                height={120}
                alt={item.title}
              />
            ))
        ) : (
          <div className={styles.emptyList}>empty album</div>
        )}
      </div>
    </div>
  );
};

export default CardAlbum;
