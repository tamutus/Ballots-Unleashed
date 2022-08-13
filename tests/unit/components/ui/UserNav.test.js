import { mount, RouterLinkStub } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routes } from "@/router"; // This import should point to your routes file declared above

import UserNav from "@/components/ui/UserNav.vue";
import { mutations } from "@/store";

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
      const $store = {
        state: {
          isLoggedIn: false,
          user: {},
        },
      };
      wrapper = mount(UserNav, appConfig($store));
    });

    it("doesn't display a profile image", () => {
      const profileImage = wrapper.find("[data-test='profile-image']");
      expect(profileImage.exists()).toBe(false);
    });
    it("prompts user to log in", () => {
      const loginButton = wrapper.find("[data-test='login-button']");
      expect(loginButton.exists()).toBe(true);
    });
    describe("the login button", () => {
      it("calls vuex", async () => {
        const fetchUser = jest.fn();
        const $store = {
          state: {
            isLoggedIn: false,
          },
          dispatch: fetchUser,
        };
        const wrapper = mount(UserNav, appConfig($store));
        const loginButton = wrapper.find("[data-test='login-button']");
        await loginButton.trigger("click");
        expect(fetchUser).toHaveBeenCalled();
      });
    });
  });
  describe("when user is logged in", () => {
    let wrapper, $store;
    beforeEach(() => {
      $store = {
        state: {
          isLoggedIn: true,
          user: {
            id: 1,
            username: "Lavra",
            profileImage:
              "https://i.kym-cdn.com/photos/images/newsfeed/001/126/045/381.jpg",
          },
        },
        mutations,
      };
      wrapper = mount(UserNav, appConfig($store));
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
        const $store = {
          state: {
            isLoggedIn: true,
            user: {
              id: 1,
              username: "Lavra",
              profileImage:
                "https://i.kym-cdn.com/photos/images/newsfeed/001/126/045/381.jpg",
            },
          },
          commit: jest.fn(),
        };
        const wrapper = mount(UserNav, appConfig($store));
        const logoutButton = wrapper.find("[data-test='logout-button']");
        await logoutButton.trigger("click");
        expect($store.commit).toHaveBeenCalledWith("LOGOUT_USER");
      });
    });
  });
});
