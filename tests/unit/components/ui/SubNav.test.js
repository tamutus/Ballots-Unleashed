import { mount } from "@vue/test-utils";

import SubNav from "@/components/SubNav.vue";

describe("SubNav", () => {
  const testItems = [
    {
      title: "test",
      link: "https://google.com",
      icon: "search",
    },
    {
      title: "test2",
      link: "https://google.com",
    },
  ];
  const wrapper = mount(SubNav, {
    global: {
      stubs: {
        FontAwesomeIcon: true,
      },
    },
    props: {
      menuItems: testItems,
    },
  });
  const menuItemTexts = wrapper
    .findAll("[data-test='sub-nav-item']")
    .map((item) => item.text());
  describe("renders menu items for navigation", () => {
    it("", () => {
      expect(menuItemTexts).toEqual(["test", "test2"]);
    });
  });
});
