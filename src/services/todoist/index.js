import axios from "axios";
import {
  getScheduledDeadlineDateDay,
  getScheduledDeadlineDateDayTime,
} from "logseq-dateutils";

import { dayjs } from "../../libs/dayjs";

import { TODOIST_API_KEY } from "../../constants";
import { sortTasks } from "./utils";

export const pullFilters = async () => {
  try {
    const response = await axios.post(
      "https://api.todoist.com/sync/v8/sync",
      {
        sync_token: "*",
        resource_types: '["filters"]',
      },
      {
        headers: {
          Authorization: `Bearer ${logseq.settings?.[TODOIST_API_KEY]}`,
        },
      }
    );

    if (response.data?.filters.length === 0) {
      logseq.App.showMsg("There are no filters found");
      return null;
    }
    return {
      filtersArray: response.data?.filters.map((filter) => ({
        content: `${filter.id} - ${filter.name}`,
      })),
    };
  } catch (e) {
    return null;
  }
};

export const sum = (a, b) => a + b;

export const pullTodayTasks = async () => {
  try {
    const response = await axios.get("https://api.todoist.com/rest/v1/tasks", {
      params: {
        // filter: "(overdue | today) & ##personal",
        filter: "tomorrow & !##WORK",
      },
      headers: {
        Authorization: `Bearer ${logseq.settings?.[TODOIST_API_KEY]}`,
      },
    });

    if (response.data.length === 0) {
      logseq.App.showMsg("There are no tasks due today");
      return null;
    }
    const sortedTasks = sortTasks(response.data);
    return {
      tasksArray: sortedTasks.map((task) => ({
        content: `TODO ${task.content} [src](${task.url})\nSCHEDULED: <${
          task.due.datetime
            ? getScheduledDeadlineDateDayTime(
                dayjs(task.due.datetime).tz("Asia/Ho_Chi_Minh").toDate()
              )
            : getScheduledDeadlineDateDay(new Date(task.due.date))
        }>`,
      })),
      taskIdsArray: response.data.map((task) => task.id),
    };
  } catch (e) {
    logseq.App.showMsg(`Error pulling tasks. Detail: ${e}`);
    return null;
  }
};
