import { AVAILABLE_ISSUE_FILTERS, FILTERED_ELECTIONS } from "@/store/constants";

const getters = {
  [AVAILABLE_ISSUE_FILTERS](state) {
    const taggedIssuesStringified = new Set();
    state.elections.forEach((election) => {
      if (Array.isArray(election.issues)) {
        election.issues.forEach((issue) => {
          taggedIssuesStringified.add(
            JSON.stringify(issue, Object.keys(issue).sort())
          );
        });
      }
    });
    const taggedIssueArray = [...taggedIssuesStringified].map(
      (stringifiedIssue) => {
        if (typeof stringifiedIssue === "string") {
          return JSON.parse(stringifiedIssue);
        } else if (typeof stringifedIssue === "object") {
          return stringifiedIssue;
        }
      }
    );
    return new Set([...taggedIssueArray]);
  },
  [FILTERED_ELECTIONS](state) {
    return state.elections.filter((election) => {
      if (
        Array.isArray(state.electionFilter?.issues) &&
        state.electionFilter.issues.length > 0
      ) {
        for (const issueID of state.electionFilter.issues) {
          if (
            !election.issues?.find((taggedIssue) => {
              return taggedIssue._id === issueID;
            })
          ) {
            return false;
          }
        }
      }
      return true;
    });
  },
};

export default getters;
