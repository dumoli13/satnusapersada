import React from 'react';
import { Dialog } from '@mui/material';
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
    <DialogHeader title={data ? 'Edit User' : 'Add User'} onClose={onClose} />
    <FormUser data={data} onClose={onClose} />
  </Dialog>
);

export default DialogFormUser;
