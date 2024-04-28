'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dynamic from 'next/dynamic';
import { UserDetail } from '@/src/interface/users';

const DialogFormTodo = dynamic(() => import('./DialogFormTodo'));

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
      <DialogFormTodo
        open={openModal}
        onClose={() => setOpenModal(false)}
        userList={userList}
      />
    </>
  );
};

export default ButtonAdd;
