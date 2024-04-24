'use client';

import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import DialogFormUser from './DialogFormUser';

const ButtonAdd = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Button
        startIcon={<AddIcon />}
        onClick={() => setOpenModal(true)}
        size="large"
        variant="contained"
      >
        Add New User
      </Button>
      <DialogFormUser open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default ButtonAdd;