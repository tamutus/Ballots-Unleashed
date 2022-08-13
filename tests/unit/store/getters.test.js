import getters from "@/store/getters";
describe("getters", () => {
  describe("AVAILABLE_ISSUE_FILTERS", () => {
    it("gets unique issues from list of elections", () => {
      const sampleElection = {
        issues: [
          {
            _id: "61cc90e95810e10016b0fb10",
            name: "Identify Best Ranked-Choice Voting System",
          },
          {
            _id: "61c0d34b08717d00167f17ba",
            name: "Ignorance of Ranked Choice Voting",
          },
        ],
      };
      const electionWithRedundantIssues = {
        issues: [
          {
            _id: "61cc90e95810e10016b0fb10",
            name: "Identify Best Ranked-Choice Voting System",
          },
          {
            _id: "61c0d34b08717d00167f17ba",
            name: "Ignorance of Ranked Choice Voting",
          },
        ],
      };
      const state = {
        elections: [sampleElection, electionWithRedundantIssues],
      };
      const result = getters.AVAILABLE_ISSUE_FILTERS(state);
      expect(result).toEqual(new Set([...sampleElection.issues]));
    });
  });
  describe("FILTERED_ELECTIONS", () => {
    const sampleID1 = "61cc90e95810e10016b0fb10";
    const sampleID2 = "61c0d34b08717d00167f17ba";
    const sampleElection1 = () => ({
      issues: [
        {
          _id: sampleID1,
          name: "Identify Best Ranked-Choice Voting System",
        },
      ],
    });
    const sampleElection2 = () => ({
      issues: [
        {
          _id: sampleID2,
          name: "Ignorance of Ranked Choice Voting",
        },
      ],
    });
    const generateSampleElections = (elections = []) => [
      sampleElection1(),
      sampleElection2(),
      ...elections,
    ];
    describe("when electionFilter has issues array", () => {
      it("identifies elections that match filter", () => {
        const stateStub = {
          elections: generateSampleElections(),
          electionFilter: {
            issues: [sampleID1],
          },
        };
        const filteredElections = getters.FILTERED_ELECTIONS(stateStub);
        expect(filteredElections).toEqual([sampleElection1()]);
      });
    });
    describe("when no electionFilter object", () => {
      it("returns full list of elections", () => {
        const stateStub = {
          elections: generateSampleElections(),
        };
        const filteredElections = getters.FILTERED_ELECTIONS(stateStub);
        expect(filteredElections).toEqual([
          sampleElection1(),
          sampleElection2(),
        ]);
      });
    });
    describe("when empty filter object", () => {
      it("returns full list of elections", () => {
        const stateStub = {
          elections: generateSampleElections(),
          electionFilter: {},
        };
        const filteredElections = getters.FILTERED_ELECTIONS(stateStub);
        expect(filteredElections).toEqual([
          sampleElection1(),
          sampleElection2(),
        ]);
      });
    });
    describe("when filter has empty arrays", () => {
      it("returns full list of elections", () => {
        const stateStub = {
          elections: generateSampleElections(),
          electionFilter: {
            issues: [],
          },
        };
        const filteredElections = getters.FILTERED_ELECTIONS(stateStub);
        expect(filteredElections).toEqual([
          sampleElection1(),
          sampleElection2(),
        ]);
      });
    });
  });
});
