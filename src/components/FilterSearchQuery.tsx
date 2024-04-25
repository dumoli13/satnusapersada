'use client';

import React, { MouseEvent, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Popover } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDebouncedCallback } from 'use-debounce';
import { css, cva } from '@/styled-system/css';
import SNTextField from './input/SNTextField';
import { createQueryString } from '../lib/misc';

const styles = {
  minimizedContainer: css({
    display: 'block',
    lg: {
      display: 'none',
    },
  }),
  iconButton: cva({
    base: {
      cursor: 'pointer',
      height: '4xl',
      width: '4xl',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: '0',
      borderRadius: 'base',
    },
    variants: {
      active: {
        true: {
          border: 'primary',
          background: 'primary.10',
        },
        false: {
          border: 'neutral',
          background: 'light.background.70',
        },
      },
    },
  }),
  searchIcon: css({}),
  closeIcon: css({}),
  modalContainer: css({
    padding: 'xs',
    width: '16xl',
    display: 'flex',
    flexDirection: 'column',
    gap: '4xs',
  }),
  searchContainer: css({
    display: 'none',
    lg: {
      display: 'flex',
      width: '16xl',
      height: '4xl',
      alignItems: 'center',
    },
  }),
};

interface Properties {
  placeholder: string;
}

const FilterSearchQuery = ({ placeholder }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const querySearchParams = searchParams.get('q') || '';

  const [keyword, setKeyword] = useState(querySearchParams);
  const [showDialog, setShowDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setKeyword(querySearchParams || '');
  }, [querySearchParams]);

  const debouncedSearch = useDebouncedCallback(() => {
    router.replace(
      `?${createQueryString({
        searchParams,
        queryObject: {
          q: keyword,
        },
      })}`,
    );
  }, 500);

  const handleChangeDekstop = (value: string) => {
    setKeyword(value);
    if (value.length >= 3 || value.length === 0) debouncedSearch();
  };

  const openSearchDialog = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    setShowDialog(true);
  };

  const closeSearchDialog = () => {
    setShowDialog(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <div className={styles.minimizedContainer}>
        <div
          onClick={openSearchDialog}
          className={styles.iconButton({ active: keyword.length > 0 })}
        >
          <SearchIcon sx={{ height: '20px', width: '20px' }} />
        </div>
        <Popover
          open={showDialog}
          anchorEl={anchorEl}
          onClose={closeSearchDialog}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <div className={styles.modalContainer}>
            <SNTextField
              placeholder={placeholder}
              value={keyword}
              onChange={setKeyword}
            />
            <Button variant="contained" fullWidth onClick={debouncedSearch}>
              Search
            </Button>
          </div>
        </Popover>
      </div>
      <div className={styles.searchContainer}>
        <SNTextField
          placeholder={placeholder}
          value={keyword}
          onChange={handleChangeDekstop}
        />
      </div>
    </div>
  );
};

export default FilterSearchQuery;
