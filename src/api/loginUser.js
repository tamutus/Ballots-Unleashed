import axios from "axios";

const loginUser = async (loginInfo) => {
  const response = await axios.get(
    `${process.env.VUE_APP_API_URL}/users/?username=${loginInfo.username}`
  );
  const user = response.data[0];

  if (loginInfo.password === user.password) {
    return user;
  } else {
    return {};
  }
};

export default loginUser;
