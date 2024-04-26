import React from 'react';
import { CircularProgress, Dialog } from '@mui/material';
import { css } from '@/styled-system/css';

interface Properties {
  open: boolean;
}

const styles = {
  root: css({
    background: 'light.background.70',
    boxShadow: 'default',
    p: 'base',
    display: 'flex',
    justifyContent: 'center',
    padding: '6xl',
  }),
};
const ModalLoading = ({ open }: Properties) => (
  <Dialog id="modal-loading" open={open}>
    <div className={styles.root}>
      <CircularProgress />
    </div>
  </Dialog>
);

export default ModalLoading;
