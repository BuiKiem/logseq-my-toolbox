/**
 * entry
 */

import "@logseq/libs";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";

const TODOIST_API_KEY = "mytodoist_api_key";

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
