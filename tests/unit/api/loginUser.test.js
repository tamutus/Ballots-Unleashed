import axios from "axios";
jest.mock("axios");

import loginUser from "@/api/loginUser";

describe("loginUser", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          username: "Jerry",
          password: "123123",
        },
      ],
    });
  });
  it("fetches a user's data", async () => {
    const loginInfo = {
      username: "Jerry",
      password: "123123",
    };
    await loginUser(loginInfo);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/users/?username=${loginInfo.username}`
    );
  });

  describe("when provided correct login info", () => {
    it("returns user data", async () => {
      const loginInfo = {
        username: "Jerry",
        password: "123123",
      };
      const data = await loginUser(loginInfo);
      expect(data).toEqual({
        ...loginInfo,
        id: 1,
      });
    });
  });
});
