'use client';

import React from 'react';
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
  const userMap = new Map<
    number,
    { name: string; completed: number; inComplete: number }
  >();

  userList.forEach((user) => {
    userMap.set(user.id, { name: user.name, completed: 0, inComplete: 0 });
  });

  todoList.forEach((todo) => {
    const user = userMap.get(todo.userId);
    if (user) {
      if (todo.completed) {
        user.completed += 1;
      } else {
        user.inComplete += 1;
      }
    }
  });

  const xLabels: string[] = [];
  const completedData: number[] = [];
  const inCompleteData: number[] = [];

  userMap.forEach((user) => {
    xLabels.push(
      `${user.name[0].toUpperCase()}.${user.name.substring(user.name.indexOf(' ') + 1)}`,
    );
    completedData.push(user.completed);
    inCompleteData.push(user.inComplete);
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
