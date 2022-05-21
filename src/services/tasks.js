import axios from "axios";

import { TODOIST_API_KEY } from "../constants";

export const getProjectName = async (projectId) => {
  const project = await axios.get(
    `https://api.todoist.com/rest/v1/projects/${projectId}`,
    {
      headers: {
        Authorization: `Bearer ${logseq.settings?.[TODOIST_API_KEY]}`,
      },
    }
  );
};

export const pullTodayTasks = async () => {
  try {
    const response = await axios.get("https://api.todoist.com/rest/v1/tasks", {
      params: {
        filter: "(overdue | today) & ##personal",
      },
      headers: {
        Authorization: `Bearer ${logseq.settings?.[TODOIST_API_KEY]}`,
      },
    });

    if (response.data.length === 0) {
      logseq.App.showMsg("There are no tasks due today");
    } else {
      return {
        tasksArray: response.data.map((task) => ({
          content: `TODO ${task.content} [src](${task.url})`,
        })),
        taskIdsArray: response.data.map((task) => task.id),
      };
    }
  } catch (e) {
    console.error(e);
  }
};