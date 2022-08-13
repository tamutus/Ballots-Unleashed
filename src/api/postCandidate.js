import axios from "axios";
import getElection from "@/api/getElection";

const postCandidate = async (electionID, newCandidate) => {
  let result = "Candidate name must be provided";
  if (newCandidate?.name?.length > 0) {
    const { name, description } = newCandidate;
    const election = await getElection(electionID);
    if (!election.candidates) {
      election.candidates = [];
    }
    const candidates = election.candidates;
    const previouslySubmitted = candidates.find(
      (existingCandidate) =>
        existingCandidate.name.toLowerCase() === newCandidate.name.toLowerCase()
    );
    if (!previouslySubmitted) {
      candidates.push({ ordinal: candidates.length + 1, name, description });
      result = await axios.put(
        `${process.env.VUE_APP_API_URL}/elections/${electionID}`,
        {
          ...election,
          candidates,
        }
      );
    }
  }
  return result;
};

export default postCandidate;
