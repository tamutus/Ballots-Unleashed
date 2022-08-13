import { mount } from "@vue/test-utils";

import AccordionList from "@/components/ui/AccordionList.vue";

describe("AccordionList", () => {
  const createConfig = () => ({
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      header: "Goodra",
    },
    slots: {
      default: "<h3>A good boy</h3>",
    },
  });
  it("hides child content by default", () => {
    const wrapper = mount(AccordionList, createConfig());
    expect(wrapper.text()).not.toMatch("A good boy");
  });
  it("shows content on header click", async () => {
    const wrapper = mount(AccordionList, createConfig());
    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");
    expect(wrapper.text()).toMatch("A good boy");
  });
});
