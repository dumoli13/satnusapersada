import { ReactNode } from 'react';
import { css } from '@/styled-system/css';

const styles = {
  root: css({
    padding: 'xl',
    mx: 'auto',
    maxWidth: 'desktop-container',
  }),
};

const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>{children}</div>
);

export default Layout;
