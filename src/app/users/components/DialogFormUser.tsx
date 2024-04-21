import { Dialog, DialogContent } from '@mui/material';
import DialogHeader from '@/src/components/DialogHeader';
import { UserDetail } from '@/src/interface/users';
import FormUser from './FormUser';

interface Properties {
  open: boolean;
  onClose: () => void;
  data?: UserDetail;
}

const DialogFormUser = ({ open, data, onClose }: Properties) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogHeader title={data ? 'Edit user' : 'Add user'} onClose={onClose} />
    <DialogContent>
      <FormUser data={data} onClose={onClose} />
    </DialogContent>
  </Dialog>
);

export default DialogFormUser;
