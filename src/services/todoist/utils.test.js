import { test, describe, expect } from "@jest/globals";
import { sortTasks } from "./utils";

describe("sortTasks", () => {
  test("should accept and do nothing with empty array", () => {
    const input = [];

    const expected = [];

    expect(sortTasks(input)).toEqual(expected);
  });

  test("should put task without due.datetime first with same due.date", () => {
    const taskWithoutTime = {
      content: "Task without due.datetime",
      due: { date: new Date().toDateString() },
    };
    const taskWithTime = {
      content: "Task with due.datetime",
      due: {
        date: new Date().toDateString(),
        datetime: new Date().toISOString(),
      },
    };
    const input = [taskWithTime, taskWithoutTime];
    const expected = [taskWithoutTime, taskWithTime];

    expect(sortTasks(input)).toEqual(expected);
  });

  test("should put task with smaller due.datetime first with the same due.date", () => {
    const smallerDate = new Date();
    const biggerDate = new Date();
    biggerDate.setHours(smallerDate.getHours() + 1);

    const taskWithSmallerDatetime = {
      content: "Task with smaller due.datetime",
      due: {
        date: smallerDate.toDateString(),
        datetime: smallerDate.toISOString(),
      },
    };
    const taskWithBiggerDatetime = {
      content: "Task with smaller due.datetime",
      due: {
        date: biggerDate.toDateString(),
        datetime: biggerDate.toISOString(),
      },
    };
    const input = [taskWithBiggerDatetime, taskWithSmallerDatetime];

    const expected = [taskWithSmallerDatetime, taskWithBiggerDatetime];

    expect(sortTasks(input)).toEqual(expected);
  });

  test("should put task with smaller due.date first with different due.date", () => {});

  test(
    "should put task with smaller due.datetime first with different due.datetime"
  );
});
