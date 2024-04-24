import { Button } from '@mui/material';
import { useState } from 'react';
import DialogFormAlbum from '../DialogFormAlbum';
import { AlbumDetail } from '@/src/interface/albums';
import { UserDetail } from '@/src/interface/users';

interface Properties {
  data: AlbumDetail;
  userList: Array<UserDetail>;
}

const ButtonEdit = ({ data, userList }: Properties) => {
  const [modalEdit, showModalEdit] = useState(false);

  return (
    <>
      <Button onClick={() => showModalEdit(true)} variant="outlined">
        Edit Album
      </Button>
      <DialogFormAlbum
        open={modalEdit}
        data={data}
        userList={userList}
        onClose={() => showModalEdit(false)}
      />
    </>
  );
};

export default ButtonEdit;
