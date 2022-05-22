import { sortBy } from "lodash";

export const sortTasks = (tasks) =>
  sortBy(tasks, [
    (task) =>
      task.due?.datetime
        ? new Date(task.due.datetime)
        : new Date(task.due.date),
  ]);
