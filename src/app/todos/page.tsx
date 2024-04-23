import { Metadata } from 'next';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import ErrorFetchingPage from '@/src/components/ErrorFetchingPage';
import Layout from '@/src/components/Layout';
import { fetchUsers } from '@/src/service/fetch/users';
import { css } from '@/styled-system/css';
import CardTodo from './components/CardTodo';
import ButtonAdd from './components/ButtonAdd';
import FilterSearchQuery from '@/src/components/FilterSearchQuery';
import { fetchTodos } from '@/src/service/fetch/todos';
import EmptyList from '@/src/components/EmptyList';
import ListUser from './components/ListUser';
import TodoChart from './components/TodoChart';

const styles = {
  headerContainer: css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'base',
    xl: {
      marginBottom: 'xl',
    },
  }),
  cardContainer: css({
    display: 'grid',
    gap: 'base',
    gridTemplateColumns: '1',
    md: {
      gridTemplateColumns: '2',
    },
    lg: {
      gridTemplateColumns: '3',
    },
  }),
};
const TodosPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { q, userId } = searchParams;

  const [todoResponse, userListResponse] = await Promise.all([
    fetchTodos({
      title: q,
    }),
    fetchUsers(),
  ]);

  if (todoResponse.success && userListResponse.success) {
    const todoList = todoResponse.data;
    const todoListFiltered = todoList.filter((item) =>
      userId ? item.userId.toString() === userId : true,
    );

    return (
      <Layout>
        <div className={styles.headerContainer}>
          <ButtonAdd userList={userListResponse.data} />
          <FilterSearchQuery placeholder="Search Todo" />
        </div>
        <TodoChart
          todoList={todoListFiltered}
          userList={userListResponse.data}
        />
        {todoList.length > 0 && (
          <>
            <ListUser userList={userListResponse.data} />
            <div className={styles.cardContainer}>
              {todoListFiltered
                .sort((a, b) => Number(a.completed) - Number(b.completed))
                .map((item, index) => (
                  <CardTodo
                    key={index}
                    data={item}
                    userList={userListResponse.data}
                  />
                ))}
            </div>
          </>
        )}
        {todoList.length === 0 && searchParams.q && (
          <EmptyList
            icon={<SearchIcon sx={{ width: 250, height: 250 }} color="error" />}
            title="No Data found"
            description="Please try another todo title"
          />
        )}
        {todoList.length === 0 && !searchParams.q && (
          <EmptyList
            icon={
              <HighlightOffIcon
                sx={{ width: 250, height: 250 }}
                color="error"
              />
            }
            title="No Data found"
            description="Create new todo"
          />
        )}
      </Layout>
    );
  }

  return (
    <Layout>
      <ErrorFetchingPage />
    </Layout>
  );
};

export default TodosPage;

export const metadata: Metadata = {
  title: 'TODOS - SAT NUSAPERSADA',
};
