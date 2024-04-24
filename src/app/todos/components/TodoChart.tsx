'use client';

import { BarChart } from '@mui/x-charts';
import { TodoDetail } from '@/src/interface/todos';
import { UserDetail } from '@/src/interface/users';
import { css } from '@/styled-system/css';

interface Properties {
  userList: Array<UserDetail>;
  todoList: Array<TodoDetail>;
}

const styles = {
  container: css({
    overflow: 'auto',
    scrollbar: 'hidden',
  }),
  innerContainer: css({
    minWidth: 'desktop-container',
  }),
};

const TodoChart = ({ userList, todoList }: Properties) => {
  const xLabels: Array<string> = [];
  const completedData: Array<number> = [];
  const inCompleteData: Array<number> = [];

  userList.forEach((item) => {
    const { name } = item;
    xLabels.push(
      `${name[0].toUpperCase()}.${name.substring(name.indexOf(' '))}`,
    );
    let countCompleted = 0;
    let countIncomplete = 0;
    todoList.forEach((todo) => {
      if (todo.userId === item.id) {
        if (todo.completed) countCompleted += 1;
        else countIncomplete += 1;
      }
    });

    completedData.push(countCompleted);
    inCompleteData.push(countIncomplete);
  });

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <BarChart
          height={300}
          series={[
            {
              data: inCompleteData,
              label: 'Completed',
              id: 'completed',
              color: '#039E8B',
            },
            {
              data: completedData,
              label: 'Incomplete',
              id: 'incomplete',
              color: '#B0030D',
            },
          ]}
          xAxis={[{ data: xLabels, scaleType: 'band' }]}
        />
      </div>
    </div>
  );
};

export default TodoChart;
