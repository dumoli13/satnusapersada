import { PieChart, useDrawingArea } from '@mui/x-charts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import BusinessIcon from '@mui/icons-material/Business';
import HomeIcon from '@mui/icons-material/Home';
import { ReactNode, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import Link from 'next/link';
import { TodoDetail } from '@/src/interface/todos';
import { UserDetail } from '@/src/interface/users';
import { css, cva } from '@/styled-system/css';

interface Properties {
  data: UserDetail;
  todos: Array<TodoDetail> | null;
}
interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const styles = {
  tabHeaderContainer: css({
    borderBottom: 'neutral',
  }),
  tabContentContainer: css({
    display: 'flex',
    flexDirection: 'column',
    gap: 'xl',
  }),
  boxContainer: css({
    border: 'neutral',
    borderRadius: 'base',
    overflow: 'hidden',
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
  chartContainer: css({
    display: 'flex',
    width: 'full',
    justifyContent: 'center',
  }),
  todoItem: cva({
    base: {
      px: 'base',
      py: 'xs',
      display: 'flex',
      gap: '2xs',
      borderBottom: 'neutral',
      _last: {
        borderBottom: 'none',
      },
    },
    variants: {
      completed: {
        true: {
          textDecoration: 'line-through',
          color: 'light.foreground.50',
          background: 'light.background.60',
        },
        false: {
          color: 'light.foreground.70',
          background: 'light.background.70',
        },
      },
    },
  }),
};

const PieCenterLabel = ({ children }: { children: ReactNode }) => {
  const { width, height } = useDrawingArea();
  return (
    <text x={width / 2 - 20} y={height / 2 + 10}>
      {children}
    </text>
  );
};
const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`abpanel-${index}`}
      {...other}
    >
      {value === index && (
        <div className={styles.tabContentContainer}>{children}</div>
      )}
    </div>
  );
};

const DetailTab = ({ data, todos }: Properties) => {
  const [tabValue, setTabs] = useState(0);

  return (
    <>
      <div className={styles.tabHeaderContainer}>
        <Tabs value={tabValue} onChange={(_event, value) => setTabs(value)}>
          <Tab label="Profile" />
          <Tab disabled={!todos || todos.length === 0} label="Todos" />
        </Tabs>
      </div>
      <CustomTabPanel value={tabValue} index={0}>
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
      </CustomTabPanel>
      <CustomTabPanel value={tabValue} index={1}>
        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: todos?.filter((item) => item.completed).length || 0,
                  label: 'Completed',
                  color: '#039E8B',
                },
                {
                  id: 1,
                  value: todos?.filter((item) => !item.completed).length || 0,
                  label: 'Incomplete',
                  color: '#B0030D',
                },
              ],
              arcLabel: (item) => `${item.value}`,
              innerRadius: 40,
            },
          ]}
          height={200}
          slotProps={{
            legend: { hidden: true },
          }}
        >
          <PieCenterLabel>Todos</PieCenterLabel>
        </PieChart>
        <div className={styles.boxContainer}>
          {todos
            ?.filter((item) => !item.completed)
            .map((item, index) => (
              <Link
                href={`/todos?id=${item.id}`}
                key={index}
                className={styles.todoItem({ completed: false })}
              >
                <CheckCircleIcon color="action" />
                <p>{item.title}</p>
              </Link>
            ))}
        </div>
        <div className={styles.boxContainer}>
          {todos
            ?.filter((item) => item.completed)
            .map((item, index) => (
              <Link
                href={`/todos?id=${item.id}`}
                target="_blank"
                key={index}
                className={styles.todoItem({ completed: true })}
              >
                <CheckCircleIcon color="success" />
                <p>{item.title}</p>
              </Link>
            ))}
        </div>
      </CustomTabPanel>
    </>
  );
};

export default DetailTab;
