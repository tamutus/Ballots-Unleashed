import { mount, RouterLinkStub } from "@vue/test-utils";

import ElectionList from "@/components/electionSearch/ElectionList.vue";

describe("ElectionList", () => {
  const createConfig = (...elections) => ({
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
    props: {
      elections: elections,
    },
  });
  it("loads a highlight component for each election", () => {
    const wrapper = mount(ElectionList, createConfig(...Array(15).fill({})));
    const electionHighlights = wrapper.findAll(
      "[data-test='election-highlight']"
    );
    expect(electionHighlights).toHaveLength(15);
  });
});
