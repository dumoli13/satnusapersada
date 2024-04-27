'use client';

import React, { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';
import { css } from '@/styled-system/css';

interface Properties {
  page: number;
  count: number;
  onChange: (data: number) => void;
}

const styles = {
  container: css({
    display: 'flex',
    padding: 'base',
    marginTop: 'base',
    borderTop: 'neutral',
    justifyContent: 'center',
    lg: {
      padding: 'xl',
      marginTop: 'xl',
    },
  }),
};

const SNPagination = ({ page = 1, count = 1, onChange }: Properties) => {
  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    onChange(value);
  };

  return (
    <div className={styles.container}>
      <Pagination
        count={count}
        color="primary"
        page={page}
        onChange={handlePageChange}
        siblingCount={0}
        boundaryCount={1}
      />
    </div>
  );
};

export default SNPagination;
