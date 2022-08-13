import state from "@/store/state";
describe("state", () => {
  it("keeps track of whether user is logged in", () => {
    const startingState = state();
    expect(startingState.isLoggedIn).toBe(false);
  });
  it("stores a list of elections", () => {
    const startingState = state();
    expect(startingState.elections).toEqual([]);
  });
  it("stores a filter for which elections to display", () => {
    const startingState = state();
    expect(startingState.electionFilter).toEqual({});
  });
});
