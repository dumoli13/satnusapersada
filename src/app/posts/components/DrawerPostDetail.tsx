'use client';

import { Avatar, Button, Drawer, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import { createQueryString } from '@/src/lib/misc';
import DialogConfirmDelete from './DialogConfirmDelete';
import { UserDetail } from '@/src/interface/users';
import DialogFormPost from './DialogFormPost';
import { CommentDetail, PostDetail } from '@/src/interface/posts';
import FormComment from './FormComment';

interface Properties {
  data: PostDetail;
  comments: CommentDetail[];
  userList: UserDetail[];
}

const styles = {
  container: css({
    width: '100vw',
    padding: 'base',
    lg: {
      width: 'modal-width',
      padding: 'xl',
    },
  }),
  buttonWrapper: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 'xl',
  }),
  contentWraper: css({
    pb: 'base',
    borderBottom: 'neutral',
    marginBottom: 'xl',
  }),
  name: css({
    fontSize: '2xl',
    fontWeight: 'bold',
    mb: '0',
  }),
  user: css({
    fontSize: 'small',
    color: 'light.foreground.50',
  }),
  body: css({
    fontSize: 'base',
    color: 'light.foreground.70',
    marginTop: 'base',
  }),
  commentContainer: css({
    borderBottom: 'neutral',
    display: 'flex',
    py: 'small',
    gap: 'base',
    _last: {
      borderBottom: 'none',
    },
  }),
  commentDetail: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  commentEmail: css({
    fontSize: 'xs',
    fontWeight: 'bold',
  }),
  commentTitle: css({
    fontSize: 'base',
    fontWeight: 'semibold',
  }),
  commentDescription: css({
    fontSize: 'small',
  }),
};

const DrawerPostDetail = ({ data, comments, userList }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalEdit, showModalEdit] = useState(false);
  const [modalDelete, showModalDelete] = useState(false);

  const user = userList.find((item) => item.id === data.userId);

  const handleClose = () => {
    router.replace(
      `?${createQueryString({
        searchParams,
        queryObject: {
          id: '',
        },
      })}`,
    );
  };

  return (
    <Drawer anchor="right" open onClose={handleClose}>
      <DialogHeader title="Post Detail" onClose={handleClose} />
      <div className={styles.container}>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => showModalEdit(true)} variant="outlined">
            Edit Post
          </Button>
          <IconButton onClick={() => showModalDelete(true)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </div>
        <div className={styles.contentWraper}>
          <div>
            <h2 className={styles.name}>{data.title}</h2>
            {user && <p className={styles.user}>by {user.name}</p>}
          </div>
          <p className={styles.body}>{data.body}</p>
        </div>
        <div className={styles.contentWraper}>
          <FormComment id={data.id} />
        </div>
        {comments.map((item, index) => {
          const initial = item.email.split('')[0];
          return (
            <div key={index} className={styles.commentContainer}>
              <Avatar>{initial}</Avatar>
              <div className={styles.commentDetail}>
                <p className={styles.commentEmail}>
                  {item.email.toLowerCase()}
                </p>
                <p className={styles.commentTitle}>{item.name}</p>
                <p className={styles.commentDescription}>{item.body}</p>
              </div>
            </div>
          );
        })}
        <DialogFormPost
          open={modalEdit}
          data={data}
          userList={userList}
          onClose={() => showModalEdit(false)}
        />
        <DialogConfirmDelete
          open={modalDelete}
          onClose={() => showModalDelete(false)}
          onSuccess={() => {
            showModalDelete(false);
            handleClose();
          }}
          id={data.id}
        />
      </div>
    </Drawer>
  );
};

export default DrawerPostDetail;
