import { Alert, Button, Dialog, Snackbar } from '@mui/material';
import { useState } from 'react';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import ModalLoading from '@/src/components/ModalLoading';
import { fetchDeleteAlbum } from '@/src/service/fetch/albums';

interface Properties {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  id: number;
}

const styles = {
  root: css({
    background: 'light.background.70',
    boxShadow: 'default',
    p: 'base',
    lg: {
      padding: 'xl',
    },
  }),
  description: css({
    marginBottom: 'base',
  }),
  ctaContainer: css({
    display: 'flex',
    gap: 'base',
  }),
};

const DialogConfirmDelete = ({ open, onClose, onSuccess, id }: Properties) => {
  const [loading, setLoading] = useState(false);
  const [snackbarSuccess, setSnacbarSuccess] = useState(false);
  const [snackbarFailed, setSnacbarFailed] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const response = await fetchDeleteAlbum(id);
    setLoading(false);
    if (response.success) {
      onSuccess();
      setSnacbarSuccess(true);
    } else {
      setSnacbarFailed(true);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <DialogHeader title="delete album" onClose={onClose} />
      <div className={styles.root}>
        <p className={styles.description}>
          Are you sure want to delete this album?{' '}
        </p>
        <div className={styles.ctaContainer}>
          <Button fullWidth variant="contained" onClick={onClose}>
            Cancel
          </Button>
          <Button fullWidth variant="outlined" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>

      <ModalLoading open={loading} />
      <Snackbar
        open={snackbarSuccess}
        autoHideDuration={6000}
        onClose={() => setSnacbarSuccess(false)}
        message="Album has been deleted successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <Snackbar
        open={snackbarFailed}
        autoHideDuration={3000}
        onClose={() => setSnacbarFailed(false)}
      >
        <Alert
          onClose={() => setSnacbarFailed(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error while deleting album
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default DialogConfirmDelete;
