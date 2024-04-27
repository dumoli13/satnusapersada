'use client';

import React, { MouseEvent, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu } from '@mui/material';
import { css, cva } from '@/styled-system/css';

const styles = {
  root: css({
    height: '6xl',
    borderBottom: 'neutral',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    background: 'light.background.70',
    zIndex: 'navbar',
  }),
  container: css({
    px: 'xl',
    py: 'base',
    margin: 'auto',
    maxWidth: 'desktop-container',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  desktopMenuContainer: css({
    display: 'none',
    md: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 'base',
    },
  }),
  mobileMenuContainer: css({
    display: 'block',
    color: 'primary.40',
    md: {
      display: 'none',
    },
  }),
  mobileListContainer: css({
    mx: 'small',
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
      display: 'flex',
      my: '2xs',
      minWidth: '8xl',
      justifyContent: 'flex-end',
      md: {
        minWidth: '6xl',
        justifyContent: 'center',
        fontSize: 'small',
      },
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

const menuList = [
  {
    link: '/posts',
    label: 'Posts',
  },
  {
    link: '/albums',
    label: 'Albums',
  },
  {
    link: '/users',
    label: 'Users',
  },
  {
    link: '/todos',
    label: 'Todos',
  },
];

const Appbar = () => {
  const pathName = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.container}>
          <Image
            alt="project_logo"
            src="/images/project_logo.svg"
            width={36}
            height={36}
          />
          <div className={styles.desktopMenuContainer}>
            {menuList.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={styles.button({ selected: pathName === item.link })}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className={styles.mobileMenuContainer}>
            <IconButton onClick={handleClick}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="mobile-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <div className={styles.mobileListContainer}>
                {menuList.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className={styles.button({
                      selected: pathName === item.link,
                    })}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </Menu>
          </div>
        </div>
      </div>
      <div className={styles.overlay} />
    </>
  );
};

export default Appbar;
