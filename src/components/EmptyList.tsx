import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { css } from '@/styled-system/css';

interface Properties {
  title: string;
  description: string;
  isSearching?: boolean;
}

const styles = {
  root: css({
    py: '2xl',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  title: css({
    textAlign: 'center',
    fontSize: 'large',
    fontWeight: 'medium',
  }),
  descrripition: css({
    textAlign: 'center',
    fontSize: 'small',
  }),
  icon: css({
    width: '16xl!',
    height: '16xl!',
    color: 'error.40',
  }),
};

const EmptyList = ({ title, description, isSearching = false }: Properties) => (
  <div className={styles.root}>
    {isSearching ? (
      <SearchIcon className={styles.icon} />
    ) : (
      <HighlightOffIcon className={styles.icon} />
    )}
    <p className={styles.title}>{title}</p>
    <p className={styles.descrripition}>{description}</p>
  </div>
);

export default EmptyList;
