import { Alert, Button, Snackbar } from '@mui/material';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { css } from '@/styled-system/css';
import SNTextField, {
  InputTextFieldRef,
} from '@/src/components/input/SNTextField';
import { validateAllRefs } from '@/src/lib/inputValidation/utils';
import ModalLoading from '@/src/components/ModalLoading';
import { FetchCreateCommentRequest } from '@/src/interface/comments';
import { fetchCreateComment } from '@/src/service/fetch/comments';

interface Properties {
  id: number;
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

const FormComment = ({ id }: Properties) => {
  const router = useRouter();

  const inputEmailRef = useRef<InputTextFieldRef>(null);
  const inputNameRef = useRef<InputTextFieldRef>(null);
  const inputBodyRef = useRef<InputTextFieldRef>(null);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [body, setBody] = useState('');

  const [loading, setLoading] = useState(false);
  const [snacbarSuccess, setSnacbarSuccess] = useState<string | null>(null);
  const [snackbarFailed, setSnacbarFailed] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (
      await validateAllRefs([
        inputEmailRef.current,
        inputNameRef.current,
        inputBodyRef.current,
      ])
    ) {
      setLoading(true);
      const payload: FetchCreateCommentRequest = {
        postId: id,
        email,
        name,
        body,
      };
      const response = await fetchCreateComment(payload);
      if (response.success) {
        router.refresh();
        setSnacbarSuccess('New comment has been create successfully');
        setEmail('');
        setName('');
        setBody('');
      } else {
        setSnacbarFailed('Error While create new comment ');
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
          id="email"
          label="Email"
          placeholder="Enter Your Email"
          inputRef={inputEmailRef}
          rules={['required', 'email']}
          size="small"
          value={email}
          onChange={setEmail}
        />
        <SNTextField
          id="name"
          label="Comment Name"
          placeholder="Enter Comment Name"
          inputRef={inputNameRef}
          rules="required"
          size="small"
          value={name}
          onChange={setName}
        />
        <SNTextField
          id="body"
          label="Comment Body"
          placeholder="Enter Comment Body"
          inputRef={inputBodyRef}
          rules="required"
          multiline
          rows={2}
          size="small"
          value={body}
          onChange={setBody}
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

export default FormComment;
