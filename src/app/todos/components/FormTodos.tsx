import { Alert, Button, Snackbar } from '@mui/material';
import { useRef, useState } from 'react';
import { css } from '@/styled-system/css';
import SNTextField, {
  InputTextFieldRef,
} from '@/src/components/input/SNTextField';
import { validateAllRefs } from '@/src/lib/inputValidation/utils';
import ModalLoading from '@/src/components/ModalLoading';
import { FetchCreateTodoRequest, TodoDetail } from '@/src/interface/todos';
import { fetchCreateTodos, fetchUpdateTodos } from '@/src/service/fetch/todos';
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

const FormTodo = ({ data, userList, onClose }: Properties) => {
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
        const response = await fetchUpdateTodos(data.id, payload);
        if (response.success) {
          setSnacbarSuccess('Todo has been updated successfully');
          onClose();
        } else {
          setSnacbarFailed('Error While updating todo data');
        }
      } else {
        const response = await fetchCreateTodos(payload);
        if (response.success) {
          setSnacbarSuccess('New todo has been create successfully');
          onClose();
        } else {
          setSnacbarFailed('Error While create new todo ');
        }
      }
      setLoading(true);
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

export default FormTodo;
