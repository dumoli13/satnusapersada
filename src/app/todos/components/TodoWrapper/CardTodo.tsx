import { useRouter } from 'next/navigation';
import { Avatar, Chip, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { css, cva } from '@/styled-system/css';
import { TodoDetail } from '@/src/interface/todos';
import { UserDetail } from '@/src/interface/users';
import { fetchPatchTodo } from '@/src/service/fetch/todos';
import DialogFormTodo from '../DialogFormTodo';
import DialogConfirmDelete from '../DialogConfirmDelete';

interface Properties {
  data: TodoDetail;
  userList: UserDetail[];
}

const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '3xs',
    border: 'neutral',
    px: 'base',
    py: 'small',
    borderRadius: 'base',
  }),
  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '3xs',
    color: 'light.foreground.50',
    fontSize: 'small',
  }),
  footer: css({
    display: 'flex',
    gap: '3xs',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  icon: css({
    width: 'large',
    height: 'large',
  }),
  name: css({
    fontWeight: 'semibold',
  }),
  tag: css({
    display: 'flex',
    alignItems: 'center',
    gap: '5xs',
    borderRadius: 'base',
    background: 'light.background.50',
    width: 'max-content',
    px: '3xs',
    py: '5xs',
    fontSize: 'xs',
  }),
  cta: cva({
    base: {
      fontSize: 'small',
      px: '2xs',
      borderRadius: 'base',
      cursor: 'pointer',
      background: 'light.background.70',
      display: 'flex',
      alignItems: 'center',
      gap: '3xs',
    },
    variants: {
      completed: {
        true: {
          border: 'success',
          color: 'success.40',
          _hover: {
            background: 'success.10',
          },
        },
        false: {
          border: 'info',
          color: 'info.40',
          _hover: {
            background: 'info.10',
          },
        },
      },
    },
  }),
  iconWrapper: css({
    display: 'flex',
  }),
};

const CardTodo = ({ data, userList }: Properties) => {
  const router = useRouter();
  const selectedUser = userList.find((item) => item.id === data.userId);

  const [modalEdit, showModalEdit] = useState(false);
  const [modalDelete, showModalDelete] = useState(false);

  const handleChange = async () => {
    await fetchPatchTodo(data.id, {
      completed: !data.completed,
    });
    router.refresh();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          {data.completed ? (
            <div
              className={styles.cta({ completed: data.completed })}
              onClick={handleChange}
            >
              <CheckCircleIcon sx={{ width: '14px', height: '14px' }} />
              Completed
            </div>
          ) : (
            <div
              className={styles.cta({ completed: data.completed })}
              onClick={handleChange}
            >
              Mark as complete
            </div>
          )}
        </div>
        <p className={styles.name}>{data.title}</p>
        <div className={styles.footer}>
          {selectedUser && (
            <Chip
              avatar={<Avatar alt={selectedUser.name} />}
              label={selectedUser.name}
              variant="outlined"
            />
          )}
          <div className={styles.iconWrapper}>
            <IconButton onClick={() => showModalEdit(true)}>
              <EditIcon color="info" />
            </IconButton>
            <IconButton onClick={() => showModalDelete(true)}>
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        </div>
      </div>
      <DialogFormTodo
        open={modalEdit}
        onClose={() => showModalEdit(false)}
        data={data}
        userList={userList}
      />
      <DialogConfirmDelete
        open={modalDelete}
        onClose={() => showModalDelete(false)}
        onSuccess={() => {
          showModalDelete(false);
          router.refresh();
        }}
        id={data.id}
      />
    </>
  );
};

export default CardTodo;
