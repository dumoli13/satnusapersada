import React, { useState, useRef } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { css } from '@/styled-system/css';
import SNTextField, {
  InputTextFieldRef,
} from '@/src/components/input/SNTextField';
import { validateAllRefs } from '@/src/lib/inputValidation/utils';
import ModalLoading from '@/src/components/ModalLoading';
import SNAutoCompleteSingle, {
  InputAutoCompleteSingleRef,
} from '@/src/components/input/SNAutoCompleteSingle';
import { UserDetail } from '@/src/interface/users';
import { FetchCreatePostRequest, PostDetail } from '@/src/interface/posts';
import { fetchCreatePost, fetchUpdatePost } from '@/src/service/fetch/posts';

interface Properties {
  data?: PostDetail;
  userList: UserDetail[];
  onClose: () => void;
}

const styles = {
  container: css({
    padding: 'base',
    border: 'neutral',
    borderRadius: 'base',
    display: 'flex',
    flexDirection: 'column',
    gap: 'base',
    mb: 'base',
  }),
  containerTitle: css({
    fontWeight: 'semibold',
    fontSize: 'base',
  }),
  halfField: css({
    width: 'full',
    display: 'grid',
    gap: 'base',
    gridTemplateColumns: '1',
    lg: {
      gridTemplateColumns: '2',
    },
  }),
  ctaContainer: css({
    display: 'flex',
    justifyContent: 'end',
    width: 'full',
  }),
};

const FormPost = ({ data, userList, onClose }: Properties) => {
  const router = useRouter();
  const userOption = userList.map((item) => ({
    id: item.id,
    label: item.name,
  }));
  const inputTitleRef = useRef<InputTextFieldRef>(null);
  const inputBodyRef = useRef<InputTextFieldRef>(null);
  const inputAuthorRef = useRef<InputAutoCompleteSingleRef>(null);

  const [loading, setLoading] = useState(false);
  const [snacbarSuccess, setSnacbarSuccess] = useState<string | null>(null);
  const [snackbarFailed, setSnacbarFailed] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (
      await validateAllRefs([
        inputTitleRef.current,
        inputBodyRef.current,
        inputAuthorRef.current,
      ])
    ) {
      setLoading(true);
      const payload: FetchCreatePostRequest = {
        title: inputTitleRef.current!.value,
        body: inputBodyRef.current!.value,
        userId: inputAuthorRef.current!.value!.id,
      };
      if (data) {
        const response = await fetchUpdatePost(data.id, payload);
        if (response.success) {
          router.refresh();
          setSnacbarSuccess('Post has been updated successfully');
          onClose();
        } else {
          setSnacbarFailed('Error While updating post data');
        }
      } else {
        const response = await fetchCreatePost(payload);
        if (response.success) {
          router.refresh();
          setSnacbarSuccess('New post has been create successfully');
          onClose();
        } else {
          setSnacbarFailed('Error While create new post ');
        }
      }
      setLoading(false);
    } else {
      setSnacbarFailed('Please check form that you have entered ');
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <SNTextField
          id="title"
          label="Title"
          placeholder="Enter Title"
          defaultValue={data?.title}
          inputRef={inputTitleRef}
          rules="required"
        />
        <SNTextField
          id="body"
          label="Body"
          placeholder="Enter Body"
          defaultValue={data?.body}
          inputRef={inputBodyRef}
          rules="required"
          multiline
          rows={3}
        />
        <SNAutoCompleteSingle
          id="author"
          label="Author"
          placeholder="Select Author"
          fullWidth
          inputRef={inputAuthorRef}
          defaultValue={
            data?.userId
              ? userOption.find((item) => item.id === data.userId)
              : undefined
          }
          rules="required"
          options={userOption}
        />
      </div>
      <div className={styles.ctaContainer}>
        <Button fullWidth variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </div>

      <ModalLoading open={loading} />
      <Snackbar
        open={snacbarSuccess !== null}
        autoHideDuration={6000}
        onClose={() => setSnacbarSuccess(null)}
        message={snacbarSuccess}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <Snackbar
        open={snackbarFailed !== null}
        autoHideDuration={3000}
        onClose={() => setSnacbarFailed(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnacbarFailed(null)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarFailed}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default FormPost;
