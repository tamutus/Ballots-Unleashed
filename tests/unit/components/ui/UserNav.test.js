import { mount, RouterLinkStub } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { createStore } from "vuex";
import { routes } from "@/router"; // This import should point to your routes file declared above

import UserNav from "@/components/ui/UserNav.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const appConfig = ($store) => ({
  global: {
    plugins: [router],
    mocks: { $store },
    stubs: {
      FontAwesomeIcon: true,
      "router-link": RouterLinkStub,
    },
  },
});
describe("UserNav", () => {
  let wrapper;
  describe("when user is logged out", () => {
    beforeEach(async () => {
      router.push("/");
      // After this line, router is ready
      await router.isReady();
      const store = createStore({
        state() {
          return {
            isLoggedIn: false,
          };
        },
      });
      wrapper = mount(UserNav, appConfig(store));
    });

    it("doesn't display a profile image", () => {
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);
    });
    it("prompts user to log in", () => {
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
  });
  // These tests need to be run with App.vue mounted, because that's where the login function lies.
  describe("when user is logged in", () => {
    let wrapper, store;
    beforeEach(() => {
      store = createStore({
        state() {
          return {
            isLoggedIn: true,
          };
        },
      });
      wrapper = mount(UserNav, appConfig(store));
    });
    it("login button is removed", async () => {
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(false);
    });
    it('"Log Out" appears', () => {
      expect(wrapper.text()).toMatch("Log Out");
    });
    it("userbar profile element appears", () => {
      expect(wrapper.text()).toMatch("Profile");
    });
    describe("the logout button", () => {
      it("calls vuex", async () => {
        const store = createStore();
        const commit = jest.fn();
        store.commit = commit;
        const wrapper = mount(UserNav, appConfig(store));
        const loginButton = wrapper.find("[data-test='login-button']");
        await loginButton.trigger("click");
        expect(commit).toHaveBeenCalledWith("LOGIN_USER");
      });
    });
  });
});
