'use client';

import { Skeleton } from '@mui/material';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import SNPagination from '@/src/components/SNPagination';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';

const CardUser = dynamic(() => import('./CardUser'), {
  loading: () => <Skeleton variant="rounded" height={125} />,
});

interface Properties {
  data: Array<UserDetail>;
}

const styles = {
  cardContainer: css({
    display: 'grid',
    gap: 'base',
    gridTemplateColumns: '1',
    md: {
      gridTemplateColumns: '2',
    },
    lg: {
      gridTemplateColumns: '3',
    },
  }),
};

const ListUsers = ({ data }: Properties) => {
  const limit = 10;
  const [page, setPage] = useState(1);

  return (
    <>
      <div className={styles.cardContainer}>
        {data.slice((page - 1) * limit, page * limit).map((item, index) => (
          <CardUser key={index} {...item} />
        ))}
      </div>

      {data.length > limit && (
        <SNPagination
          page={page}
          count={Math.ceil(data.length / limit)}
          onChange={setPage}
        />
      )}
    </>
  );
};

export default ListUsers;
