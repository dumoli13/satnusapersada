import React from 'react';
import { Dialog } from '@mui/material';
import DialogHeader from '@/src/components/DialogHeader';
import FormTodo from './FormTodos';
import { TodoDetail } from '@/src/interface/todos';
import { UserDetail } from '@/src/interface/users';

interface Properties {
  open: boolean;
  onClose: () => void;
  data?: TodoDetail;
  userList: UserDetail[];
}

const DialogFormTodo = ({ open, data, onClose, userList }: Properties) => (
  <Dialog open={open} onClose={onClose} fullWidth>
    <DialogHeader title={data ? 'Edit Todos' : 'Add Todos'} onClose={onClose} />
    <FormTodo data={data} onClose={onClose} userList={userList} />
  </Dialog>
);

export default DialogFormTodo;
