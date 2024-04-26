import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import DialogConfirmDelete from '../DialogConfirmDelete';

interface Properties {
  id: number;
}

const ButtonDelete = ({ id }: Properties) => {
  const router = useRouter();
  const [modalDelete, showModalDelete] = useState(false);

  return (
    <>
      <IconButton onClick={() => showModalDelete(true)}>
        <DeleteIcon color="error" />
      </IconButton>
      <DialogConfirmDelete
        open={modalDelete}
        onClose={() => showModalDelete(false)}
        onSuccess={() => {
          showModalDelete(false);
          router.refresh();
        }}
        id={id}
      />
    </>
  );
};

export default ButtonDelete;
