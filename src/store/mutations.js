import {
  FOCUS_ELECTION,
  LOGIN_USER,
  LOGOUT_USER,
  RECEIVE_ELECTIONS,
  UPDATE_ELECTION_FILTER,
} from "@/store/constants";

const mutations = {
  [LOGIN_USER](state, user) {
    if (user && Object.keys(user).length !== 0) {
      state.user = user;
      state.isLoggedIn = true;
    }
  },
  [LOGOUT_USER](state) {
    state.isLoggedIn = false;
  },
  [RECEIVE_ELECTIONS](state, elections) {
    state.elections = elections;
  },
  [FOCUS_ELECTION](state, election) {
    state.election = election;
  },
  [UPDATE_ELECTION_FILTER](state, electionFilter) {
    if (!state.electionFilter) {
      state.electionFilter = {};
    }
    for (const validFilter of ["issues", "communities"]) {
      if (electionFilter[validFilter]) {
        state.electionFilter[validFilter] = electionFilter[validFilter];
      }
    }
  },
};

export default mutations;
