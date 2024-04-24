import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DialogConfirmDelete from '../DialogConfirmDelete';

interface Properties {
  id: number;
  onClose: () => void;
}

const ButtonDelete = ({ id, onClose }: Properties) => {
  const [modalDelete, showModalDelete] = useState(false);

  return (
    <>
      <IconButton onClick={() => showModalDelete(true)}>
        <DeleteIcon color="primary" />
      </IconButton>
      <DialogConfirmDelete
        open={modalDelete}
        onClose={() => showModalDelete(false)}
        onSuccess={() => {
          showModalDelete(false);
          onClose();
        }}
        id={id}
      />
    </>
  );
};

export default ButtonDelete;
