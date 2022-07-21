// import { nextTick } from "vue";
import { mount } from "@vue/test-utils";

import FlashySpotlight from "@/components/section/FlashySpotlight.vue";

describe("FlashySpotlight", () => {
  const testHeaders = [
    ["Run", "The", "Jewels"],
    ["Bernie", "Sanders"],
  ];
  const testSections = ["Apples", "Oranges"];

  it("renders header text", () => {
    const wrapper = mount(FlashySpotlight, {
      props: {
        headerParts: testHeaders,
        sections: testSections,
      },
    });
    expect(wrapper.text()).toMatch("Jewels");
  });
  it("renders section titles", () => {
    const wrapper = mount(FlashySpotlight, {
      props: {
        headerParts: testHeaders,
        sections: testSections,
      },
    });
    expect(wrapper.text()).toMatch("Oranges");
  });
  describe("when provided arrays as headerParts", () => {
    beforeEach(() => {
      jest.useFakeTimers("legacy");
    });
    afterEach(() => {
      jest.useRealTimers();
    });
    it("creates timers to shift words", async () => {
      mount(FlashySpotlight, {
        props: {
          headerParts: testHeaders,
        },
      });
      expect(setInterval).toHaveBeenCalled();
    });
    it("changes the highlighted word", async () => {
      const wrapper = mount(FlashySpotlight, {
        props: {
          headerParts: testHeaders,
          sections: testSections,
        },
        attachTo: document.body,
      });
      expect(wrapper.vm.intervals[1].currentIndex).toBe(0);
      jest.runOnlyPendingTimers();
      expect(wrapper.vm.intervals[1].currentIndex).toBe(1);
    });
    it("on unloading, removes timers for shifting words", () => {
      const wrapper = mount(FlashySpotlight, {
        props: {
          headerParts: testHeaders,
          sections: testSections,
        },
        attachTo: document.body,
      });
      wrapper.unmount();
      expect(clearInterval).toHaveBeenCalled();
    });
  });
});
