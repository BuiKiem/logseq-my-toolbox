/**
 * entry
 */

import "@logseq/libs";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";

function main() {
  console.info("BuiKiem todoist plugin loaded");

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("app")
  );

  // Register pull tasks command
  logseq.Editor.registerSlashCommand("buikiem - pull tasks", async () => {
    logseq.App.showMsg("TODO: Pull tasks with specified filter");
  });
}

// bootstrap
logseq
  .useSettingsSchema([
    {
      key: "api_key",
      default: "",
      description: "Todoist API key",
      title: "Todoist API Key",
      type: "string",
    },
  ])
  .ready(main)
  .catch(console.error);
