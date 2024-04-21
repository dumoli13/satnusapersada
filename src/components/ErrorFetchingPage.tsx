import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { css } from '@/styled-system/css';
import EmptyList from './EmptyList';

const styles = {
  root: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  icon: css({
    color: 'error.30',
  }),
};
const ErrorFetchingPage = () => (
  <div className={styles.root}>
    <EmptyList
      icon={
        <HighlightOffIcon
          sx={{ width: 250, height: 250 }}
          className={styles.icon}
        />
      }
      title="Error While Fetching Data"
      description="Please try again later"
    />
  </div>
);

export default ErrorFetchingPage;
