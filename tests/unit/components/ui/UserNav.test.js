import { mount, RouterLinkStub } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router"; // This import should point to your routes file declared above

import App from "@/App.vue";
import UserNav from "@/components/ui/UserNav.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const appConfig = () => ({
  global: {
    plugins: [router],
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
      wrapper = mount(UserNav, appConfig());
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
  describe("when user logs in", () => {
    it("removes the login button", async () => {
      wrapper = mount(App, appConfig());
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      const lingeringLoginButton = wrapper.find("[data-test='login-button']");
      expect(lingeringLoginButton.exists()).toBe(false);
    });
    describe("userbar has a Log Out element", () => {
      it("appearing", async () => {
        wrapper = mount(App, appConfig());
        const loginButton = wrapper.find("[data-test='login-button']");
        await loginButton.trigger("click");
        expect(wrapper.text()).toMatch("Log Out");
      });
    });
    describe("userbar has a profile element", () => {
      it("appearing", async () => {
        wrapper = mount(App, appConfig());
        const loginButton = wrapper.find("[data-test='login-button']");
        await loginButton.trigger("click");
        expect(wrapper.text()).toMatch("Profile");
      });
    });
    it("displays a profile image", async () => {
      wrapper = mount(App, appConfig());
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
    it("emits a login event", async () => {
      wrapper = mount(UserNav, appConfig());
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      expect(wrapper.emitted()["login"]).toEqual([[]]);
    });
  });
});
