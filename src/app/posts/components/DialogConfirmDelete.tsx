import { Alert, Button, Dialog, Snackbar } from '@mui/material';
import { useState } from 'react';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import ModalLoading from '@/src/components/ModalLoading';
import { fetchDeletePost } from '@/src/service/fetch/posts';

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
    const response = await fetchDeletePost(id);
    setLoading(false);
    if (response.success) {
      onSuccess();
      setSnacbarSuccess(true);
    } else {
      setSnacbarFailed(true);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogHeader title="delete post" onClose={onClose} />
      <div className={styles.root}>
        <p className={styles.description}>
          Are you sure want to delete this post?
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
        message="Post has been deleted successfully"
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
          Error while deleting post
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default DialogConfirmDelete;
