import { mount } from "@vue/test-utils";

import CandidateSection from "@/components/election/CandidateSection";

describe("CandidateSection", () => {
  const createStore = (config = {}, state = {}) => ({
    state: {
      election: {
        id: 22,
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
        ballots: [],
      },
      user: {},
      isLoggedIn: false,
      ...state,
    },
    dispatch: jest.fn(),
    ...config,
  });
  const createConfig = ($store = createStore()) => {
    return {
      global: {
        mocks: {
          $store,
        },
      },
    };
  };
  it("renders candidate names", () => {
    const wrapper = mount(CandidateSection, createConfig());
    expect(wrapper.text()).toMatch("Radahn");
  });
  it("renders candidate names", () => {
    const wrapper = mount(CandidateSection, createConfig());
    expect(wrapper.text()).toMatch("A very large guy");
  });
  describe("when logged in", () => {
    describe("when no candidates are scored", () => {
      let loggedInConfig;
      beforeEach(() => {
        loggedInConfig = createConfig(
          createStore(
            {},
            {
              isLoggedIn: true,
              user: {
                id: 1,
              },
            }
          )
        );
      });
      it("there are no downvote buttons", () => {
        const wrapper = mount(CandidateSection, loggedInConfig);
        const downvoter = wrapper.find("[data-test='downvoter']");
        expect(downvoter.exists()).toBe(false);
      });
      it("there are upvote buttons", () => {
        const wrapper = mount(CandidateSection, loggedInConfig);
        const upvoter = wrapper.find("[data-test='upvoter']");
        expect(upvoter.exists()).toBe(true);
      });
      it("upvoting a candidate creates a downvote button", async () => {
        const wrapper = mount(CandidateSection, loggedInConfig);
        const upvoter = wrapper.find("[data-test='upvoter']");
        await upvoter.trigger("click");
      });
    });
  });
});
