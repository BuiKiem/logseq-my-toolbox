import axios from "axios";

export const getActiveTasks = (token, filter) =>
  axios.get("https://api.todoist.com/rest/v1/tasks", {
    params: {
      // filter: "(overdue | today) & ##personal",
      filter,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllProjects = (token) =>
  axios.get("https://api.todoist.com/rest/v1/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
