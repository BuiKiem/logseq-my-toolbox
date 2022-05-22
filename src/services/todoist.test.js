import { test, expect } from "@jest/globals";

const { sum } = require("./todoist");

test("add 1 + 2 should be equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
