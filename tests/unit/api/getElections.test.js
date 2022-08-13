import axios from "axios";
jest.mock("axios");

import getElections from "@/api/getElections";

describe("getElections", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: "Bravest Hero",
        },
      ],
    });
  });
  it("fetches elections", async () => {
    await getElections();
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/elections`
    );
  });

  it("extracts elections from response", async () => {
    const data = await getElections();
    expect(data).toEqual([
      {
        id: 1,
        title: "Bravest Hero",
      },
    ]);
  });
});
