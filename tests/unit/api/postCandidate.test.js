import axios from "axios";
jest.mock("axios");

import postCandidate from "@/api/postCandidate";

describe("postCandidate", () => {
  const fakeID = 12345;
  const sampleCandidate = {
    name: "End War",
    description: "War creates massive, but untracked, carbon emissions",
  };
  const sampleElection = {
    id: 1,
    title: "ABC",
    description: "0",
  };
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [sampleElection],
    });
    axios.put.mockResolvedValue({
      data: [
        {
          ...sampleElection,
          candidates: [
            {
              ...sampleCandidate,
              ordinal: 1,
            },
          ],
        },
      ],
    });
  });
  afterEach(() => {
    axios.get.mockClear();
    axios.put.mockClear();
  });
  it("fetches an election by ID", async () => {
    await postCandidate(fakeID, sampleCandidate);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/elections/${fakeID}`
    );
  });
  describe("when an empty name is provided", () => {
    it("sends a string with a failure", async () => {
      const data = await postCandidate({
        name: "",
        description: "Nobody should win",
      });
      expect(data).toEqual(expect.any(String));
    });
    it("doesn't send a PUT request", async () => {
      await postCandidate({
        name: "",
        description: "Did this get submitted to the database?",
      });
      expect(axios.put).not.toHaveBeenCalled();
    });
  });
  describe("when only name and description are provided", () => {
    it("sends PUT request to election by ID", async () => {
      await postCandidate(fakeID, sampleCandidate);
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.VUE_APP_API_URL}/elections/${fakeID}`,
        expect.anything()
      );
    });
    it("adds the next candidate ordinal to the submitted request", async () => {
      await postCandidate(fakeID, sampleCandidate);
      expect(axios.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          candidates: [
            {
              ...sampleCandidate,
              ordinal: 1,
            },
          ],
        })
      );
    });
    // Decide if this is desired behavior
    // it("returns the new election", async () => {
    //   const data = await postCandidate(fakeID, sampleCandidate);
    //   expect(data).toEqual({
    //     ...sampleElection,
    //     candidates: [
    //       {
    //         ...sampleCandidate,
    //         ordinal: 1,
    //       },
    //     ],
    //   });
    // });
  });
});
