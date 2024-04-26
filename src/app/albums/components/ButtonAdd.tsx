'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { UserDetail } from '@/src/interface/users';
import DialogFormAlbum from './DialogFormAlbum';

interface Properties {
  userList: UserDetail[];
}
const ButtonAdd = ({ userList }: Properties) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        onClick={() => setOpenModal(true)}
        size="large"
        variant="contained"
      >
        Add New
      </Button>
      <DialogFormAlbum
        open={openModal}
        onClose={() => setOpenModal(false)}
        userList={userList}
      />
    </>
  );
};

export default ButtonAdd;
