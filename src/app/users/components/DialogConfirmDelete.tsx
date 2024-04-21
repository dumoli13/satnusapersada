import { Alert, Button, Dialog, Snackbar } from '@mui/material';
import { useState } from 'react';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import ModalLoading from '@/src/components/ModalLoading';
import { fetchDeleteUser } from '@/src/service/fetch/users';

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
  const [snackbarSuccessDelete, setSnacbarSuccessDelete] = useState(false);
  const [snackbarFailedDelete, setSnacbarFailedDelete] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const response = await fetchDeleteUser(id);
    setLoading(false);
    if (response.success) {
      onSuccess();
      setSnacbarSuccessDelete(true);
    } else {
      setSnacbarFailedDelete(true);
    }
  };
  return (
    <Dialog open={open} onClose={onClose} fullScreen>
      <DialogHeader title="delete user" onClose={onClose} />
      <div className={styles.root}>
        <p className={styles.description}>
          Are you sure want to delete this user?{' '}
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
        open={snackbarSuccessDelete}
        autoHideDuration={6000}
        onClose={() => setSnacbarSuccessDelete(false)}
        message="User has been deleted successfully"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <Snackbar
        open={snackbarFailedDelete}
        autoHideDuration={3000}
        onClose={() => setSnacbarFailedDelete(false)}
      >
        <Alert
          onClose={() => setSnacbarFailedDelete(false)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Error while deleting user
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default DialogConfirmDelete;
