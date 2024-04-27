import React from 'react';
import { Dialog } from '@mui/material';
import DialogHeader from '@/src/components/DialogHeader';
import FormAlbum from './FormAlbum';
import { UserDetail } from '@/src/interface/users';
import { AlbumDetail } from '@/src/interface/albums';

interface Properties {
  open: boolean;
  onClose: () => void;
  data?: AlbumDetail;
  userList: UserDetail[];
}

const DialogFormAlbum = ({ open, data, onClose, userList }: Properties) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogHeader title={data ? 'Edit Album' : 'Add Album'} onClose={onClose} />
    <FormAlbum data={data} onClose={onClose} userList={userList} />
  </Dialog>
);

export default DialogFormAlbum;
