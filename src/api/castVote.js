import axios from "axios";

const castVote = async (electionID, userID, ranking) => {
  if (!electionID || !userID || !Array.isArray(ranking)) {
    return `Must pass all three of the following parameters:
    electionID: ${electionID},
    userID: ${userID}
    ranking (as an array of ordinals): ${ranking}`;
  }
  const response = await axios.get(
    `${process.env.VUE_APP_API_URL}/elections/${electionID}`
  );
  const election = response.data;
  const ballots = election.ballots;
  const previouslyCastBallot = ballots.find(
    (existingBallot) => existingBallot.userID === userID
  );
  if (previouslyCastBallot) {
    previouslyCastBallot.ranking = ranking;
  } else {
    ballots.push({
      userID,
      ranking,
    });
  }
  const result = await axios.put(
    `${process.env.VUE_APP_API_URL}/elections/${electionID}`,
    {
      ...election,
      ballots,
    }
  );
  return result;
};

export default castVote;
