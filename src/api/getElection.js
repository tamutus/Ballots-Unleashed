import axios from "axios";

const getElection = async (electionID) => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_URL}/elections/${electionID}`
  );
  return response.data;
};

export default getElection;
