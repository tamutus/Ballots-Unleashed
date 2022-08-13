import mutations from "@/store/mutations";

import loginUser from "@/api/loginUser";
jest.mock("@/api/loginUser");

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    const user = {
      username: "Joe",
      password: "Jerry",
    };
    loginUser.mockResolvedValue(user);
    it("logs the user in", () => {
      const stateStub = { isLoggedIn: false };
      mutations.LOGIN_USER(stateStub, user);
      expect(stateStub).toEqual({ isLoggedIn: true, user });
    });
  });
  describe("LOGOUT_USER", () => {
    it("logs the user out", () => {
      const stateStub = { isLoggedIn: true };
      mutations.LOGOUT_USER(stateStub);
      expect(stateStub).toEqual({ isLoggedIn: false });
    });
  });
  describe("RECEIVE_ELECTIONS", () => {
    it("receives elections from API response", () => {
      const stateStub = {
        elections: [],
      };
      const electionsStub = [
        {
          id: 1,
          title: "Best Harry Potter Movie",
        },
      ];
      expect(stateStub.elections).toEqual([]);
      mutations.RECEIVE_ELECTIONS(stateStub, electionsStub);
      expect(stateStub.elections).toEqual([
        {
          id: 1,
          title: "Best Harry Potter Movie",
        },
      ]);
    });
  });
  describe("UPDATE_ELECTION_FILTER", () => {
    it("can add issues to election filter", () => {
      const stateStub = { electionFilter: {} };
      mutations.UPDATE_ELECTION_FILTER(stateStub, {
        issues: ["1", "2"],
      });
      expect(stateStub).toEqual({
        electionFilter: {
          issues: ["1", "2"],
        },
      });
    });
    it("can add communities to election filter", () => {
      const stateStub = { electionFilter: {} };
      mutations.UPDATE_ELECTION_FILTER(stateStub, {
        communities: ["Universal", "Region"],
      });
      expect(stateStub).toEqual({
        electionFilter: {
          communities: ["Universal", "Region"],
        },
      });
    });
    it("lets you remove all filters", () => {
      const stateStub = {
        electionFilter: {
          communities: ["Universal", "Region"],
        },
      };
      mutations.UPDATE_ELECTION_FILTER(stateStub, {
        communities: [],
      });
      expect(stateStub).toEqual({
        electionFilter: {
          communities: [],
        },
      });
    });
    it("doesn't overwrite omitted properties", () => {
      const stateStub = {
        electionFilter: {
          issues: ["1", "2"],
        },
      };
      mutations.UPDATE_ELECTION_FILTER(stateStub, {
        communities: ["Bubble"],
      });
      expect(stateStub.electionFilter.issues).toEqual(["1", "2"]);
    });
    it("doesn't add unapproved filters", () => {
      const stateStub = {
        electionFilter: {
          issues: ["1", "2"],
        },
      };
      mutations.UPDATE_ELECTION_FILTER(stateStub, {
        gregories: ["Blue"],
      });
      expect(stateStub).toEqual({
        electionFilter: {
          issues: ["1", "2"],
        },
      });
    });
  });
});
