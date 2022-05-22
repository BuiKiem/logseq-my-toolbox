import axios from "axios";
import { test, describe, expect } from "@jest/globals";
import { getActiveTasks } from "./apis";

jest.mock("axios");

describe("getActiveTasks", () => {
  test("should call axios.get method", async () => {
    await getActiveTasks();
    expect(axios.get).toBeCalled();
  });

  test("should call axios.get with token as headers.Authorization", async () => {
    const token = "token";
    const expected = {
      params: expect.anything(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await getActiveTasks(token, expect.anything());

    expect(axios.get).toBeCalledWith(expect.anything(), expected);
  });

  test("should call axios.get with filter as params.filter", async () => {
    const filter = "filter";
    const expected = {
      params: { filter },
      headers: expect.anything(),
    };

    await getActiveTasks(expect.anything(), filter);

    expect(axios.get).toBeCalledWith(expect.anything(), expected);
  });
});
