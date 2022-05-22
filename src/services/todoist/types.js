/**
 * @typedef Due
 * @description Detail: https://developer.todoist.com/rest/v1/#tasks
 * @type {object}
 * @property {string} string - Human defined date in arbitrary format.
 * @property {string} date - Date in format YYYY-MM-DD corrected to user's timezone.
 * @property {boolean} recurring - Whether the task has a recurring due date.
 * @property {string} [datetime] - Only returned if exact due time set (i.e. it's not a whole-day task), date and time in RFC3339 format in UTC.
 * @property {string} [timezone] - Only returned if exact due time set, user's timezone definition either in tzdata-compatible format ("Europe/Berlin") or as a string specifying east of UTC offset as "UTC±HH:MM" (i.e. "UTC-01:00").
 */

/**
 * @typedef Task
 * @description Detail: https://developer.todoist.com/rest/v1/#tasks
 * @type {object}
 * @property {number} id - Task ID.
 * @property {number} project_id - Task's project ID (read-only).
 * @property {number} section_id - ID of section task belongs to.
 * @property {string} content - Task content. This value may contain markdown-formatted text and hyperlinks.
 * @property {string} description - A description for the task. This value may contain markdown-formatted text and hyperlinks.
 * @property {boolean} completed - Flag to mark completed tasks.
 * @property {number[]} label_ids - Array of label IDs, associated with a task.
 * @property {number} [parent_id] - ID of parent task (read-only, absent for top-level tasks).
 * @property {number} integer - Position under the same parent or project for top-level tasks (read-only).
 * @property {number} priority - Task priority from 1 (normal, default value) to 4 (urgent).
 * @property {Due} [due]
 * @property {string} url - URL to access this task in the Todoist web or mobile applications.
 */
