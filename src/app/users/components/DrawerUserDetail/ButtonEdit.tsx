import React, { useState } from 'react';
import { Button } from '@mui/material';
import { UserDetail } from '@/src/interface/users';
import DialogFormUser from '../DialogFormUser';

interface Properties {
  data: UserDetail;
}

const ButtonEdit = ({ data }: Properties) => {
  const [modalEdit, showModalEdit] = useState(false);

  return (
    <>
      <Button onClick={() => showModalEdit(true)} variant="outlined">
        Edit Profile
      </Button>
      <DialogFormUser
        open={modalEdit}
        data={data}
        onClose={() => showModalEdit(false)}
      />
    </>
  );
};

export default ButtonEdit;
