import { mount } from "@vue/test-utils";

import App from "@/App.vue";
import UserNav from "@/components/ui/UserNav.vue";

describe("UserNav", () => {
  const wrapper = mount(UserNav);
  describe("when user is logged out", () => {
    const loginButton = wrapper.find("[data-test='login-button']");
    it("doesn't display a profile image", () => {
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);
    });
    it("prompts user to log in", () => {
      expect(loginButton.exists()).toBe(true);
    });
  });
  // These tests need to be run with App.vue mounted, because that's where the login function lies.
  describe("when user logs in", () => {
    const appConfig = {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    };
    const appWrapper = mount(App, appConfig);
    it("removes the login button", async () => {
      const loginButton = appWrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      const lingeringLoginButton = appWrapper.find(
        "[data-test='login-button']"
      );
      expect(lingeringLoginButton.exists()).toBe(false);
      await loginButton.trigger("click");
    });
    it("emits a login event", async () => {
      const wrapper = mount(UserNav);
      const loginButton = wrapper.find("[data-test='login-button']");
      await loginButton.trigger("click");
      expect(wrapper.emitted()["login"]).toEqual([[]]);
    });
    describe("userbar has a Log Out element", () => {
      it("appearing", () => {
        expect(appWrapper.text()).toMatch("Log Out");
      });
    });
    describe("userbar has a profile element", () => {
      it("appearing", () => {
        expect(appWrapper.text()).toMatch("Profile");
      });
    });
    it("displays a profile image", () => {
      const profileImage = appWrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(true);
    });
  });
});
