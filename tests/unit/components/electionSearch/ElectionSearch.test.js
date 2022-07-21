import { mount } from "@vue/test-utils";

import ElectionSearch from "@/components/electionSearch/ElectionSearch.vue";

describe("ElectionSearch", () => {
  describe("when user submits form", () => {
    const push = jest.fn();
    const createConfig = () => ({
      attachTo: document.body,
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
        mocks: {
          $router: { push },
        },
      },
    });
    it("directs user to election results page with user's search parameters", async () => {
      const wrapper = mount(ElectionSearch, createConfig());
      const topicInput = wrapper.find("[data-test='topic-filter']");
      await topicInput.setValue("Best vegan diners");

      const locationInput = wrapper.find("[data-test='location-filter']");
      await locationInput.setValue("Delaware");

      const submitButton = wrapper.find("[data-test='election-search-submit']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "electionFilter",
        query: {
          topic: "Best vegan diners",
          location: "Delaware",
        },
      });
    });
  });
});
