/**
 * entry
 */

import "@logseq/libs";
function main() {
  logseq.App.showMsg("BuiKiem hello world");
}

// bootstrap
logseq.ready(main).catch(console.error);
