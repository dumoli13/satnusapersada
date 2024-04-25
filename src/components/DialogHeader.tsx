import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { css } from '@/styled-system/css';

interface Properties {
  title: string;
  onClose: () => void;
}
const styles = {
  container: css({
    py: '3xs',
    px: 'xs',
    borderBottom: 'neutral',
    display: 'flex',
    alignItems: 'center',
    gap: 'xs',
    position: 'sticky',
    top: '0',
    background: 'light.background.70',
    zIndex: 'modal',
  }),
  title: css({
    fontSize: 'large',
    fontWeight: 'bold',
  }),
};
const DialogHeader = ({ title, onClose }: Properties) => (
  <div className={styles.container}>
    <IconButton onClick={onClose}>
      <CloseIcon />
    </IconButton>
    <div className={styles.title}>{title}</div>
  </div>
);

export default DialogHeader;
