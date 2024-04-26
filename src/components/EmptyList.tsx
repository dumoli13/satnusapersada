import React, { ReactNode } from 'react';
import { css } from '@/styled-system/css';

interface Properties {
  icon: ReactNode;
  title: string;
  description: string;
  cta?: ReactNode;
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
    fontSize: 'base',
    fontWeight: 'medium',
  }),
  descrripition: css({
    textAlign: 'center',
    fontSize: 'small',
  }),
};

const EmptyList = ({ icon, title, description, cta }: Properties) => (
  <div className={styles.root}>
    {icon}
    <p className={styles.title}>{title}</p>
    <p className={styles.descrripition}>{description}</p>
    {cta}
  </div>
);

export default EmptyList;
