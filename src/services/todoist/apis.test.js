import axios from "axios";
import { test, describe, expect } from "@jest/globals";
import { getActiveTasks, getAllProjects, syncResources } from "./apis";

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

describe("getAllProjects", () => {
  test("should call axios.get method", async () => {
    await getAllProjects();
    expect(axios.get).toBeCalled();
  });

  test("should call axios.get with token as headers.Authorization", async () => {
    const token = "token";
    const expected = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await getAllProjects(token, jest.mock);

    expect(axios.get).toBeCalledWith(expect.anything(), expected);
  });
});

describe("syncResources", () => {
  test("should call axios.post method", async () => {
    const token = "token";
    const resources = ["projects", "filters"];

    await syncResources(token, resources);

    expect(axios.post).toBeCalled();
  });

  test("should call axios.post method with body having sync_token and resource_types property", async () => {
    const token = "token";
    const resources = ["projects", "filters"];
    const expected = {
      sync_token: "*",
      resource_types: '["projects","filters"]',
    };

    await syncResources(token, resources);

    expect(axios.post).toBeCalledWith(
      expect.anything(),
      expected,
      expect.anything()
    );
  });

  test("should call axios.post with `token` as headers.Authorization", async () => {
    const token = "token";
    const resources = ["projects", "filters"];
    const expected = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await syncResources(token, resources);

    expect(axios.post).toBeCalledWith(
      expect.anything(),
      expect.anything(),
      expected
    );
  });
});
