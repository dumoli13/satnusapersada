import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import { UserDetail } from '@/src/interface/users';
import DialogFormTodo from '../DialogFormTodo';
import { TodoDetail } from '@/src/interface/todos';

interface Properties {
  data: TodoDetail;
  userList: Array<UserDetail>;
}

const ButtonEdit = ({ data, userList }: Properties) => {
  const [modalEdit, showModalEdit] = useState(false);

  return (
    <>
      <IconButton onClick={() => showModalEdit(true)}>
        <EditIcon color="info" />
      </IconButton>
      <DialogFormTodo
        open={modalEdit}
        onClose={() => showModalEdit(false)}
        data={data}
        userList={userList}
      />
    </>
  );
};

export default ButtonEdit;
