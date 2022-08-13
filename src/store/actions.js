import {
  DOWNVOTE_CANDIDATE,
  FETCH_ELECTION,
  FETCH_ELECTIONS,
  FETCH_USER,
  FOCUS_ELECTION,
  LOGIN_USER,
  RECEIVE_ELECTIONS,
  SUBMIT_CANDIDATE,
  SUBMIT_RANKING,
  UPVOTE_CANDIDATE,
} from "@/store/constants";
import getElection from "@/api/getElection";
import getElections from "@/api/getElections";
import castVote from "@/api/castVote";
import loginUser from "@/api/loginUser";
import postCandidate from "@/api/postCandidate";

const actions = {
  [FETCH_ELECTION]: async (context, electionID) => {
    const election = await getElection(electionID);
    context.commit(FOCUS_ELECTION, election);
  },
  [FETCH_ELECTIONS]: async (context) => {
    const electionList = await getElections();
    context.commit(RECEIVE_ELECTIONS, electionList);
  },
  [FETCH_USER]: async (context, loginInfo) => {
    const user = await loginUser(loginInfo);
    context.commit(LOGIN_USER, user);
  },
  [SUBMIT_CANDIDATE]: async (context, details) => {
    console.log(details);
    const result = await postCandidate(details.electionID, details.candidate);
    console.log(result);
    context.dispatch(FETCH_ELECTION, details.electionID);
  },
  [UPVOTE_CANDIDATE]: (context, candidateContext) => {
    console.log(context.state);
    if (!context.state.user.id || !context.state.election.id) {
      return;
    }
    let updatedRanking;
    if (candidateContext.ballotIndex === -1) {
      updatedRanking = [candidateContext.ordinal];
    } else {
      updatedRanking =
        context.state.election.ballots[
          candidateContext.ballotIndex
        ].ranking.slice();
      const position = updatedRanking.findIndex(
        (ordinal) => ordinal === candidateContext.ordinal
      );
      if (position > 0) {
        [updatedRanking[position], updatedRanking[position - 1]] = [
          updatedRanking[position - 1],
          updatedRanking[position],
        ];
      } else if (position === -1) {
        updatedRanking.push(candidateContext.ordinal);
      }
    }
    context.dispatch(SUBMIT_RANKING, updatedRanking);
  },
  [DOWNVOTE_CANDIDATE](context, candidateContext) {
    if (!context.state.user.id || !context.state.election.id) {
      return;
    }
    let updatedRanking;
    if (candidateContext.ballotIndex === -1) {
      updatedRanking = [candidateContext.ordinal];
    } else {
      updatedRanking =
        context.state.election.ballots[
          candidateContext.ballotIndex
        ].ranking.slice();
      const position = updatedRanking.findIndex(
        (ordinal) => ordinal === candidateContext.ordinal
      );
      if (position === updatedRanking.length - 1) {
        updatedRanking.pop();
      } else if (position >= 0) {
        [updatedRanking[position], updatedRanking[position + 1]] = [
          updatedRanking[position + 1],
          updatedRanking[position],
        ];
      }
    }
    context.dispatch(SUBMIT_RANKING, updatedRanking);
  },
  [SUBMIT_RANKING]: async (context, ranking) => {
    const result = await castVote(
      context.state.election.id,
      context.state.user.id,
      ranking
    );
    console.log(result);
    context.dispatch(FOCUS_ELECTION, context.state.election.id);
  },
};

export default actions;
