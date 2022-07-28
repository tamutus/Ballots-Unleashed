import { state, mutations } from "@/store";

describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });
});

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const stateStub = { isLoggedIn: false };
      mutations.LOGIN_USER(stateStub);
      expect(stateStub).toEqual({ isLoggedIn: true });
    });
  });
  describe("LOGOUT_USER", () => {
    it("logs the user out", () => {
      const stateStub = { isLoggedIn: true };
      mutations.LOGOUT_USER(stateStub);
      expect(stateStub).toEqual({ isLoggedIn: false });
    });
  });
});
