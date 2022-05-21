/**
 * entry
 */

import "@logseq/libs";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { TODOIST_API_KEY } from "./constants";
import { pullTodayTasks, pullFilters } from "./services/todoist";

function onSettingsChange() {
  const apiKey = logseq.settings?.[TODOIST_API_KEY] ?? "API key not found";
  console.info(`API key: ${apiKey}`);
}

function main() {
  console.info("BuiKiem todoist plugin loaded");
  onSettingsChange();
  logseq.onSettingsChanged(onSettingsChange);

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("app")
  );

  // Register pull tasks command
  logseq.Editor.registerSlashCommand("buikiem - pull tasks", async () => {
    console.info("TODO: Pull tasks with specified filter");

    const tasksArray = await pullTodayTasks();
    const currentBlock = await logseq.Editor.getCurrentBlock();

    if (currentBlock && tasksArray) {
      await logseq.Editor.updateBlock(currentBlock.uuid, "Tasks for today");

      await logseq.Editor.insertBatchBlock(
        currentBlock.uuid,
        tasksArray.tasksArray,
        {
          sibling: !parent,
          before: true,
        }
      );
    }
  });

  logseq.Editor.registerSlashCommand("buikiem - pull filters", async () => {
    console.info("Pull filters");

    const filtersArray = await pullFilters();
    const currentBlock = await logseq.Editor.getCurrentBlock();

    if (currentBlock && filtersArray) {
      await logseq.Editor.updateBlock(currentBlock.uuid, "Filters");

      await logseq.Editor.insertBatchBlock(
        currentBlock.uuid,
        filtersArray.filtersArray,
        {
          sibling: !parent,
          before: true,
        }
      );
    }
  });
}

// bootstrap
logseq
  .useSettingsSchema([
    {
      key: TODOIST_API_KEY,
      default: "",
      description: "Todoist API key",
      title: "Todoist API Key",
      type: "string",
    },
  ])
  .ready(main)
  .catch(console.error);
