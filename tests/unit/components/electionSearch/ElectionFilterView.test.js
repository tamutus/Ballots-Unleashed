import { mount } from "@vue/test-utils";
import axios from "axios";
jest.mock("axios");

import ElectionFilterView from "@/views/election/ElectionFilterView.vue";

describe("ElectionFilterView", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: [] });
  });
  afterEach(() => {
    axios.get.mockReset();
  });
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });
  const createConfig = ($route) => ({
    global: {
      mocks: {
        $route,
      },
    },
  });
  it("fetches elections", () => {
    mount(ElectionFilterView, createConfig(createRoute()));
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/elections`
    );
  });
});
