'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { css, cva } from '@/styled-system/css';

const styles = {
  container: css({
    px: 'xl',
    py: 'base',
    height: '6xl',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid {colors.line.primary}',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    background: 'light.background.70',
    zIndex: 'navbar',
  }),
  menuContainer: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 'base',
  }),
  overlay: css({
    height: '6xl',
    width: 'full',
  }),
  button: cva({
    base: {
      py: '5xs',
      px: '2xs',
      borderRadius: 'base',
      fontSize: 'small',
      minWidth: '6xl',
      display: 'flex',
      justifyContent: 'center',
    },
    variants: {
      selected: {
        true: {
          background: 'primary.10',
          fontWeight: 'medium',
          color: 'primary.30',
        },
        false: {
          _hover: {
            background: 'primary.10',
          },
        },
      },
    },
  }),
};

const Appbar = () => {
  const pathName = usePathname();
  return (
    <>
      <div className={styles.container}>
        <Image
          alt="project_logo"
          src="/images/project_logo.svg"
          width={36}
          height={36}
        />
        <div className={styles.menuContainer}>
          <Link
            href="/"
            className={styles.button({ selected: pathName === '/' })}
          >
            Post
          </Link>
          <Link
            href="/albums"
            className={styles.button({ selected: pathName === '/albums' })}
          >
            Albums
          </Link>
          <Link
            href="/users"
            className={styles.button({ selected: pathName === '/users' })}
          >
            User
          </Link>
          <Link
            href="/todos"
            className={styles.button({ selected: pathName === '/todos' })}
          >
            Todo
          </Link>
        </div>
        <div />
      </div>
      <div className={styles.overlay} />
    </>
  );
};

export default Appbar;
