import actions from "@/store/actions";
import getElections from "@/api/getElections";
jest.mock("@/api/getElections");

describe("actions", () => {
  describe("FETCH_ELECTIONS", () => {
    beforeEach(() => {
      getElections.mockResolvedValue([
        {
          id: 1,
          title: "Cool election",
        },
      ]);
    });
    it("makes request to fetch elections", async () => {
      const context = {
        commit: jest.fn(),
      };
      await actions.FETCH_ELECTIONS(context);
      expect(getElections).toHaveBeenCalled();
    });
    it("sends message to save received elections in store", async () => {
      const commit = jest.fn();
      const context = { commit };
      await actions.FETCH_ELECTIONS(context);
      expect(commit).toHaveBeenCalledWith("RECEIVE_ELECTIONS", [
        {
          id: 1,
          title: "Cool election",
        },
      ]);
    });
  });
});
