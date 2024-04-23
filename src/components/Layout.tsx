import { ReactNode } from 'react';
import { css } from '@/styled-system/css';

const styles = {
  root: css({
    padding: 'base',
    mx: 'auto',
    maxWidth: 'desktop-container',
    xl: {
      padding: 'xl',
    },
  }),
};

const Layout = ({ children }: { children: ReactNode }) => (
  <div className={styles.root}>{children}</div>
);

export default Layout;
