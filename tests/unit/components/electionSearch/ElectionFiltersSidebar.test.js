import { mount } from "@vue/test-utils";

import ElectionFiltersSidebar from "@/components/electionSearch/ElectionFiltersSidebar.vue";

describe("ElectionFiltersSidebar", () => {
  const createConfig = ($store = {}) => ({
    global: {
      mocks: {
        $store: {
          getters: {
            AVAILABLE_ISSUE_FILTERS: new Set([
              {
                _id: "234",
                name: "Ableism",
              },
              {
                _id: "123",
                name: "Climate Change",
              },
            ]),
          },
          ...$store,
        },
      },
      stubs: {
        FontAwesomeIcon: true,
      },
    },
  });
  it("renders a unique list of issues to filter by", async () => {
    const wrapper = mount(ElectionFiltersSidebar, createConfig());
    const issueFiltersArea = wrapper.find("[data-test='issue-filters']");
    const clickableArea = issueFiltersArea.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    const issueFilterLabels = issueFiltersArea.findAll(
      "[data-test='issue-filter']"
    );
    const issueFilters = issueFilterLabels.map((node) => node.text());
    expect(issueFilters).toEqual(["Ableism", "Climate Change"]);
  });
  it("renders a list of community levels to filter by", async () => {
    const wrapper = mount(ElectionFiltersSidebar, createConfig());
    const communityFiltersArea = wrapper.find(
      "[data-test='community-filters']"
    );
    const clickableArea = communityFiltersArea.find(
      "[data-test='clickable-area']"
    );
    await clickableArea.trigger("click");
    const communityFilterLabels = communityFiltersArea.findAll(
      "[data-test='community-filter']"
    );
    const communityFilters = communityFilterLabels.map((node) => node.text());
    expect(communityFilters).toEqual([
      "Universal",
      "Region",
      "Organization",
      "Bubble",
      "Friends",
    ]);
  });
  describe("when user selects issue filter", () => {
    it("communicates issue should be added to vuex filter", async () => {
      const commit = jest.fn();
      const sampleIssue1 = () => ({
        _id: "234",
        name: "Ableism",
      });
      const sampleIssue2 = () => ({
        _id: "123",
        name: "Climate Change",
      });
      const $store = {
        getters: {
          AVAILABLE_ISSUE_FILTERS: new Set([sampleIssue1(), sampleIssue2()]),
        },
        commit,
      };
      const wrapper = mount(ElectionFiltersSidebar, createConfig($store));
      const issueFiltersArea = wrapper.find("[data-test='issue-filters']");
      const clickableArea = issueFiltersArea.find(
        "[data-test='clickable-area']"
      );
      await clickableArea.trigger("click");
      const issueCheckbox = issueFiltersArea.find(
        "[data-test='issue-checkbox']"
      );
      await issueCheckbox.setChecked();
      expect(commit).toHaveBeenCalledWith(
        "UPDATE_ELECTION_FILTER",
        expect.objectContaining({
          issues: [sampleIssue1()._id],
        })
      );
    });
  });
});
