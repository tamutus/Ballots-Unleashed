import { mount, RouterLinkStub } from "@vue/test-utils";

import ElectionFilterView from "@/views/election/ElectionFilterView.vue";

describe("ElectionFilterView", () => {
  const createRoute = (queryParams = {}) => ({
    query: {
      page: "5",
      ...queryParams,
    },
  });
  const electionCount = 15;
  const createStore = (config = {}) => ({
    getters: {
      FILTERED_ELECTIONS: Array(electionCount).fill({}),
    },
    dispatch: jest.fn(),
    ...config,
  });
  const createConfig = ($route, $store) => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
        "router-link": RouterLinkStub,
      },
      mocks: {
        $route,
        $store,
      },
    },
  });
  describe("when component mounts", () => {
    it("loads elections from the store", async () => {
      const storeMock = createStore();
      mount(ElectionFilterView, createConfig(createRoute(), storeMock));
      expect(storeMock.dispatch).toHaveBeenCalledWith("FETCH_ELECTIONS");
    });
  });
});
