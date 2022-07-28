import { mount } from "@vue/test-utils";

import CandidateSection from "@/components/election/CandidateSection";

describe("CandidateSection", () => {
  const createConfig = () => ({
    props: {
      candidates: [
        {
          ordinal: 1,
          name: "Radahn",
          description: "A very large guy with a very small horse",
        },
        {
          ordinal: 2,
          name: "Mewtwo",
          description: "Cool as a cucumber",
        },
        {
          ordinal: 3,
          name: "Smaug",
          description: "Scaley plunderer",
        },
      ],
    },
  });
  it("renders candidate names", () => {
    const wrapper = mount(CandidateSection, createConfig());
    expect(wrapper.text()).toMatch("Radahn");
  });
  it("renders candidate names", () => {
    const wrapper = mount(CandidateSection, createConfig());
    expect(wrapper.text()).toMatch("A very large guy");
  });

  describe("when no candidates are scored", () => {
    it("there are no downvote buttons", () => {
      const wrapper = mount(CandidateSection, createConfig());
      const downvoter = wrapper.find("[data-test='downvoter']");
      expect(downvoter.exists()).toBe(false);
    });
    it("there are upvote buttons", () => {
      const wrapper = mount(CandidateSection, createConfig());
      const upvoter = wrapper.find("[data-test='upvoter']");
      expect(upvoter.exists()).toBe(true);
    });
    it("upvoting a candidate creates a downvote button", async () => {
      const wrapper = mount(CandidateSection, createConfig());
      const upvoter = wrapper.find("[data-test='upvoter']");
      await upvoter.trigger("click");
    });
  });
});
