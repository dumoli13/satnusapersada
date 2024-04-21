'use client';

import { Button, Drawer, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { css } from '@/styled-system/css';
import DialogHeader from '@/src/components/DialogHeader';
import { UserDetail } from '@/src/interface/users';
import DialogFormUser from './DialogFormUser';
import { createQueryString } from '@/src/lib/misc';
import DialogConfirmDelete from './DialogConfirmDelete';

interface Properties {
  data: UserDetail;
}

const styles = {
  container: css({
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    gap: 'xl',
    padding: 'base',
    lg: {
      width: 'modal-width',
      padding: 'xl',
    },
  }),
  userName: css({
    color: 'light.foreground.50',
    fontSize: 'base',
    marginBottom: '4xs',
  }),
  name: css({
    fontSize: '2xl',
    fontWeight: 'medium',
  }),
  buttonWrapper: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  boxContainer: css({
    border: 'neutral',
    borderRadius: 'base',
  }),
  boxItem: css({
    px: 'base',
    py: 'xs',
    display: 'flex',
    gap: '2xs',
    borderBottom: 'neutral',
    _last: {
      borderBottom: 'none',
    },
  }),
  locationWrapper: css({
    width: 'full',
    display: 'grid',
    gridTemplateColumns: '1',
    gap: '4xs',
    md: {
      gridTemplateColumns: '2',
    },
  }),
  boxTitle: css({
    fontSize: 'xs',
  }),
  boxDescription: css({
    fontSize: 'small',
  }),
  boxDescriptionMap: css({
    fontSize: 'small',
    color: 'info.30',
    fontStyle: 'italic',
  }),
};

const DrawerUserDetail = ({ data }: Properties) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const handleClose = () => {
    router.replace(
      `?${createQueryString({
        searchParams,
        queryObject: {
          id: '',
        },
      })}`,
    );
  };

  return (
    <Drawer anchor="right" open onClose={handleClose}>
      <DialogHeader title="Worker Detail" onClose={handleClose} />
      <div className={styles.container}>
        <div>
          <p className={styles.userName}>{data.username}</p>
          <p className={styles.name}>{data.name}</p>
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => setModalEdit(true)} variant="outlined">
            Edit Profile
          </Button>
          <IconButton onClick={() => setModalDelete(true)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.boxItem}>
            <EmailIcon color="action" />
            <div>
              <p className={styles.boxTitle}>email</p>
              {data.email ? (
                <Link
                  href={`mailto:${data.email.toLowerCase()}`}
                  target="_blank"
                  className={styles.boxDescription}
                >
                  {data.email}
                </Link>
              ) : (
                <p className={styles.boxDescription}>-</p>
              )}
            </div>
          </div>
          <div className={styles.boxItem}>
            <PhoneIcon color="action" />
            <div>
              <p className={styles.boxTitle}>phone</p>
              {data.phone ? (
                <Link
                  href={`tel:${data.phone}`}
                  target="_blank"
                  className={styles.boxDescription}
                >
                  {data.phone}
                </Link>
              ) : (
                <p className={styles.boxDescription}>-</p>
              )}
            </div>
          </div>
          <div className={styles.boxItem}>
            <LanguageIcon color="action" />
            <div>
              <p className={styles.boxTitle}>website</p>
              {data.website ? (
                <Link
                  href={data.website}
                  target="_blank"
                  className={styles.boxDescription}
                >
                  {data.website}
                </Link>
              ) : (
                <p className={styles.boxDescription}>-</p>
              )}
            </div>
          </div>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.boxItem}>
            <BusinessIcon color="action" />
            <div className={styles.locationWrapper}>
              <div>
                <p className={styles.boxTitle}>name</p>
                <p className={styles.boxDescription}>
                  {data.company.name || '-'}
                </p>
              </div>
              <div>
                <p className={styles.boxTitle}>catch phrase</p>
                <p className={styles.boxDescription}>
                  {data.company.catchPhrase || '-'}
                </p>
              </div>
              <div>
                <p className={styles.boxTitle}>bs</p>
                <p className={styles.boxDescription}>
                  {data.company.bs || '-'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.boxContainer}>
          <div className={styles.boxItem}>
            <HomeIcon color="action" />
            <div className={styles.locationWrapper}>
              <div>
                <p className={styles.boxTitle}>suite</p>
                <p className={styles.boxDescription}>
                  {data.address.suite || '-'}
                </p>
              </div>
              <div>
                <p className={styles.boxTitle}>street</p>
                <p className={styles.boxDescription}>
                  {data.address.street || '-'}
                </p>
              </div>
              <div>
                <p className={styles.boxTitle}>city</p>
                <p className={styles.boxDescription}>
                  {data.address.city || '-'}
                </p>
              </div>
              <div>
                <p className={styles.boxTitle}>zipcode</p>
                <p className={styles.boxDescription}>
                  {data.address.zipcode || '-'}
                </p>
              </div>
              {data.address.geo && (
                <div>
                  <p className={styles.boxTitle}>location</p>
                  <Link
                    href={`https://maps.google.com/?q=${data.address.geo.lat},${data.address.geo.lng}`}
                    className={styles.boxDescriptionMap}
                    target="_blank"
                  >
                    (open in google maps)
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DialogFormUser
        open={modalEdit}
        data={data}
        onClose={() => setModalEdit(false)}
      />
      <DialogConfirmDelete
        open={modalDelete}
        onClose={() => setModalDelete(false)}
        onSuccess={() => {
          setModalDelete(false);
          handleClose();
        }}
        id={data.id}
      />
    </Drawer>
  );
};

export default DrawerUserDetail;
