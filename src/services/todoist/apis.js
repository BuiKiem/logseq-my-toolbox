import axios from "axios";
import _ from "lodash";

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
 * @returns {Promise<Project[]>}
 */
export async function getAllProjects(token) {
  return axios.get("https://api.todoist.com/rest/v1/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function generateResourceTypes(resources) {
  return `[${_.join(
    resources.map((resource) => `"${resource}"`),
    ","
  )}]`;
}

/**
 *
 * @param {string} token
 * @param {string[]} resources
 * @returns {Promise<>}
 */
export async function syncResources(token, resources) {
  const resourceTypes = generateResourceTypes(resources);
  return axios.post(
    "https://api.todoist.com/sync/v8/sync",
    {
      sync_token: "*",
      resource_types: resourceTypes,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
