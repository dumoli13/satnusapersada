import React from 'react';
import { Dialog, DialogContent } from '@mui/material';
import DialogHeader from '@/src/components/DialogHeader';
import FormPost from './FormPost';
import { UserDetail } from '@/src/interface/users';
import { PostDetail } from '@/src/interface/posts';

interface Properties {
  open: boolean;
  onClose: () => void;
  data?: PostDetail;
  userList: UserDetail[];
}

const DialogFormPost = ({ open, data, onClose, userList }: Properties) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogHeader title={data ? 'Edit Post' : 'Add Post'} onClose={onClose} />
    <DialogContent>
      <FormPost data={data} onClose={onClose} userList={userList} />
    </DialogContent>
  </Dialog>
);

export default DialogFormPost;
