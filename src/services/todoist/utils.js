import { sortBy } from "lodash";

/**
 * Sort tasks by due
 * @param {Task[]} tasks
 * @returns {Task[]}
 */
export function sortTasks(tasks) {
  return sortBy(tasks, [
    (task) =>
      task.due?.datetime
        ? new Date(task.due.datetime)
        : new Date(task.due.date),
  ]);
}
