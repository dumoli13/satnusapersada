import React, { useState, useRef } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { useRouter } from 'next/navigation';
import { css } from '@/styled-system/css';
import SNTextField, {
  InputTextFieldRef,
} from '@/src/components/input/SNTextField';
import { validateAllRefs } from '@/src/lib/inputValidation/utils';
import ModalLoading from '@/src/components/ModalLoading';
import { FetchCreateTodoRequest, TodoDetail } from '@/src/interface/todos';
import { fetchCreateTodo, fetchUpdateTodo } from '@/src/service/fetch/todos';
import SNAutoCompleteSingle, {
  InputAutoCompleteSingleRef,
} from '@/src/components/input/SNAutoCompleteSingle';
import { UserDetail } from '@/src/interface/users';

interface Properties {
  data?: TodoDetail;
  userList: UserDetail[];
  onClose: () => void;
}

const styles = {
  root: css({
    md: {
      pt: 'base',
      px: 'xl',
      gap: 'base',
    },
  }),
  container: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 'xs',
    py: 'xs',
    px: 'base',
    borderBottom: 'neutral',
    md: {
      gap: 'base',
      borderRadius: 'base',
      border: 'neutral',
      padding: 'base',
      mb: 'base',
      _last: {
        mb: '0',
      },
    },
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
    py: 'xs',
    px: 'base',
    md: {
      py: 'base',
      px: 'xl',
    },
  }),
};

const FormTodo = ({ data, userList, onClose }: Properties) => {
  const router = useRouter();
  const userOption = userList.map((item) => ({
    id: item.id,
    label: item.name,
  }));
  const inputTitleRef = useRef<InputTextFieldRef>(null);
  const inputAssigneeRef = useRef<InputAutoCompleteSingleRef>(null);

  const [loading, setLoading] = useState(false);
  const [snacbarSuccess, setSnacbarSuccess] = useState<string | null>(null);
  const [snackbarFailed, setSnacbarFailed] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (
      await validateAllRefs([inputTitleRef.current, inputAssigneeRef.current])
    ) {
      setLoading(true);
      const payload: FetchCreateTodoRequest = {
        title: inputTitleRef.current!.value,
        userId: inputAssigneeRef.current!.value!.id,
        completed: data?.completed || false,
      };
      if (data) {
        const response = await fetchUpdateTodo(data.id, payload);
        if (response.success) {
          router.refresh();
          setSnacbarSuccess('Todo has been updated successfully');
          onClose();
        } else {
          setSnacbarFailed('Error While updating todo data');
        }
      } else {
        const response = await fetchCreateTodo(payload);
        if (response.success) {
          router.refresh();
          setSnacbarSuccess('New todo has been create successfully');
          onClose();
        } else {
          setSnacbarFailed('Error While create new todo ');
        }
      }
      setLoading(false);
    } else {
      setSnacbarFailed('Please check form that you have entered ');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <SNTextField
            id="title"
            label="Title"
            placeholder="Enter Title"
            defaultValue={data?.title}
            inputRef={inputTitleRef}
            rules="required"
          />

          <SNAutoCompleteSingle
            id="assignee"
            label="Assignee"
            placeholder="Select Assignee"
            fullWidth
            inputRef={inputAssigneeRef}
            defaultValue={
              data?.userId
                ? userOption.find((item) => item.id === data.userId)
                : undefined
            }
            rules="required"
            options={userOption}
          />
        </div>
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
    </>
  );
};

export default FormTodo;
