import axios from "axios";
jest.mock("axios");

import castVote from "@/api/castVote.js";

describe("castVote", () => {
  const fakeElectionID = 12345,
    fakeUserID = 5,
    sampleBallot = {
      userID: fakeUserID,
      ranking: [1, 2, 3],
    },
    sampleElection = () => ({
      id: fakeElectionID,
      title: "ABC",
      description: "def",
      ballots: [
        {
          userID: 3,
          ranking: [3, 2, 1],
        },
      ],
    });
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: sampleElection(),
    });
    axios.put.mockResolvedValue({
      data: [
        {
          ...sampleElection(),
          ballots: [...sampleElection().ballots, sampleBallot],
        },
      ],
    });
  });
  afterEach(() => {
    axios.get.mockClear();
    axios.put.mockClear();
  });
  it("fetches an election by ID", async () => {
    await castVote(fakeElectionID, fakeUserID, sampleBallot.ranking);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.VUE_APP_API_URL}/elections/${fakeElectionID}`
    );
  });
  describe("when an electionID is not provided", () => {
    it("sends a string with a failure", async () => {
      const data = await castVote(undefined, fakeUserID, sampleBallot.ranking);
      expect(data).toEqual(expect.any(String));
    });
    it("doesn't send a PUT request", async () => {
      await castVote(undefined, fakeUserID, sampleBallot.ranking);
      expect(axios.put).not.toHaveBeenCalled();
    });
  });
  describe("when no userID is provided", () => {
    it("sends a string with a failure", async () => {
      const data = await castVote(
        fakeElectionID,
        undefined,
        sampleBallot.ranking
      );
      expect(data).toEqual(expect.any(String));
    });
    it("doesn't send a PUT request", async () => {
      await castVote(fakeElectionID, undefined, sampleBallot.ranking);
      expect(axios.put).not.toHaveBeenCalled();
    });
  });
  describe("when no ranking is provided", () => {
    it("sends a string with a failure", async () => {
      const data = await castVote(fakeElectionID, fakeUserID, undefined);
      expect(data).toEqual(expect.any(String));
    });
    it("doesn't send a PUT request", async () => {
      await castVote(fakeElectionID, fakeUserID, undefined);
      expect(axios.put).not.toHaveBeenCalled();
    });
  });
  describe("when electionID, userID, and an array of ordinals are passed", () => {
    it("sends PUT request to election by ID", async () => {
      await castVote(fakeElectionID, fakeUserID, sampleBallot.ranking);
      expect(axios.put).toHaveBeenCalledWith(
        `${process.env.VUE_APP_API_URL}/elections/${fakeElectionID}`,
        expect.anything()
      );
    });
    it("adds the ballot to the submitted request", async () => {
      await castVote(fakeElectionID, fakeUserID, sampleBallot.ranking);
      expect(axios.put).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          ballots: [...sampleElection().ballots, sampleBallot],
        })
      );
    });
    // Decide if this is desired behavior
    // it("returns the new election", async () => {
    //   const data = await postCandidate(fakeID, sampleCandidate);
    //   expect(data).toEqual({
    //     ...sampleElection(),
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
