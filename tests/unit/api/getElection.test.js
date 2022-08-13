import axios from "axios";
jest.mock("axios");

import getElection from "@/api/getElection";

describe("getElection", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: {
        id: 1,
        title: "Climate Change Priorities",
        candidates: [
          {
            ordinal: 1,
            name: "End War",
            description: "War creates massive, but untracked, carbon emissions",
          },
        ],
      },
    });
  });
  it("fetches an election's data", async () => {
    const sampleElectionID = 420;
    await getElection(sampleElectionID);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/elections/${sampleElectionID}`
    );
  });

  it("extracts an election from the response", async () => {
    const data = await getElection();
    expect(data).toEqual({
      id: 1,
      title: "Climate Change Priorities",
      candidates: [
        {
          ordinal: 1,
          name: "End War",
          description: "War creates massive, but untracked, carbon emissions",
        },
      ],
    });
  });
});
