'use client';

import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';
import { createQueryString } from '@/src/lib/misc';

const styles = {
  container: css({
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '3xs',
    border: 'neutral',
    px: 'base',
    py: 'small',
    borderRadius: 'base',
    _hover: {
      background: 'light.background.60',
    },
  }),
  header: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '3xs',
    color: 'light.foreground.50',
    fontSize: 'small',
  }),
  footer: css({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '3xs',
  }),
  icon: css({
    width: 'large',
    height: 'large',
  }),
  name: css({
    fontWeight: 'semibold',
  }),
  tag: css({
    display: 'flex',
    alignItems: 'center',
    gap: '5xs',
    borderRadius: 'base',
    background: 'light.background.50',
    width: 'max-content',
    px: '3xs',
    py: '5xs',
    fontSize: 'xs',
  }),
};

const CardUser = ({ id, name, phone, email, company }: UserDetail) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOpen = () => {
    router.replace(
      `?${createQueryString({
        searchParams,
        queryObject: {
          id: id.toString(),
        },
      })}`,
    );
  };

  return (
    <div className={styles.container} onClick={handleOpen}>
      <div className={styles.header}>
        <p>{company.name}</p>
      </div>
      <p className={styles.name}>{name}</p>
      <div className={styles.footer}>
        <div className={styles.tag}>
          <LocalPhoneIcon
            color="action"
            sx={{ width: '16px', height: '16px' }}
          />
          {phone}
        </div>
        <div className={styles.tag}>
          <MailIcon color="secondary" sx={{ width: '16px', height: '16px' }} />
          {email.toLocaleLowerCase()}
        </div>
      </div>
    </div>
  );
};

export default CardUser;
