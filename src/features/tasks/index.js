import {
  getScheduledDeadlineDateDay,
  getScheduledDeadlineDateDayTime,
} from "logseq-dateutils";
import _ from "lodash";
import { dayjs } from "../../libs/dayjs";

import { TODOIST_API_KEY } from "../../constants";
import { sortTasks } from "../../services/todoist/utils";
import { getActiveTasks, getAllProjects } from "../../services/todoist/apis";

export const pullTodayTasks = async () => {
  const todoistToken = logseq.settings?.[TODOIST_API_KEY];
  try {
    const [tasksResponse, projectsResponse] = await Promise.all([
      getActiveTasks(todoistToken, "tomorrow & !##WORK"),
      getAllProjects(todoistToken),
    ]);
    const projectsById = _.keyBy(projectsResponse.data, "id");
    if (tasksResponse.data.length === 0) {
      logseq.App.showMsg("There are no tasks due today");
      return null;
    }
    const sortedTasks = sortTasks(tasksResponse.data);
    return {
      tasksArray: sortedTasks.map((task) => ({
        content: `TODO ${task.content} [src](${task.url})\nSCHEDULED: <${
          task.due.datetime
            ? getScheduledDeadlineDateDayTime(
                dayjs(task.due.datetime).tz("Asia/Ho_Chi_Minh").toDate()
              )
            : getScheduledDeadlineDateDay(new Date(task.due.date))
        }>\nproject:: [[${projectsById[task.project_id].name}]]`,
      })),
      taskIdsArray: tasksResponse.data.map((task) => task.id),
    };
  } catch (e) {
    logseq.App.showMsg(`Error pulling tasks. Detail: ${e}`);
    return null;
  }
};
