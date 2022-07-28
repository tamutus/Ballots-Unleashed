import { shallowMount, RouterLinkStub } from "@vue/test-utils";
import { createStore } from "vuex";

import MainNav from "@/components/ui/MainNav.vue";

describe("MainNav", () => {
  const createConfig = (store) => ({
    global: {
      plugins: [store],
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  const store = createStore();
  const wrapper = shallowMount(MainNav, createConfig(store));

  const menuItemTexts = wrapper
    .findAll("[data-test='main-nav-item']")
    .map((item) => item.text());
  describe("displays menu items for navigation", () => {
    it("as 'li's", () => {
      expect(menuItemTexts).toEqual(["RCV", "Bubbles", "Elections"]);
    });
    describe("has a Home link", () => {
      it("displays the a home link", () => {
        expect(wrapper.text()).toMatch("RCV");
      });
    });
  });
  describe("when user is logged in", () => {
    it("displays a profile image", () => {
      const store = createStore({
        state() {
          return {
            isLoggedIn: true,
          };
        },
      });
      const wrapper = shallowMount(MainNav, createConfig(store));
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
  });
});
