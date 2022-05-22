import axios from "axios";

/**
 *
 * @param {string} token - Todoist API token
 * @param {string} filter - valid Todoist task filter string
 * @returns {Promise<Task[]>}
 */
export async function getActiveTasks(token, filter) {
  return axios.get("https://api.todoist.com/rest/v1/tasks", {
    params: {
      // filter: "(overdue | today) & ##personal",
      filter,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

/**
 *
 * @param {string} token
 * @returns {Promise<Project>}
 */
export async function getAllProjects(token) {
  return axios.get("https://api.todoist.com/rest/v1/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
