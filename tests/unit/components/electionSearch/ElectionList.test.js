import { mount, RouterLinkStub } from "@vue/test-utils";

import ElectionList from "@/components/electionSearch/ElectionList.vue";

describe("ElectionList", () => {
  const createConfig = (elections = []) => ({
    global: {
      mocks: {
        $store: {
          getters: {
            FILTERED_ELECTIONS: elections,
          },
        },
      },
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
    props: {
      elections,
    },
  });
  it("loads a highlight component for each election", () => {
    const wrapper = mount(
      ElectionList,
      createConfig([
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ])
    );
    const electionHighlights = wrapper.findAll(
      "[data-test='election-highlight']"
    );
    expect(electionHighlights).toHaveLength(3);
  });
  it("renders the number of matching elections", () => {
    const wrapper = mount(
      ElectionList,
      createConfig([
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
      ])
    );
    const electionResultsCounter = wrapper.find("[data-test='election-count']");
    expect(electionResultsCounter.text()).toMatch("3");
  });
});
