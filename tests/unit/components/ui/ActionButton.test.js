import { mount } from "@vue/test-utils";

import ActionButton from "@/components/ui/ActionButton";

describe("ActionButton", () => {
  it("renders text", () => {
    const testText = "I'm so clickable";
    const wrapper = mount(ActionButton, {
      props: {
        displayText: testText,
        buttonKind: "energetic",
      },
    });
    expect(wrapper.text()).toMatch(testText);
  });
  it("applies one of several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        type: "energetic",
        displayText: "Yo",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("energetic")).toBe(true);
  });
});
