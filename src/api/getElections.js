import axios from "axios";

const getElections = async () => {
  const response = await axios.get(`${process.env.VUE_APP_API_URL}/elections`);
  return response.data;
};

export default getElections;
