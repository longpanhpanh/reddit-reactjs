import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

const useRefreshToken = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const localUser = JSON.parse(localStorage.getItem("user"));

  const refresh = async () => {
    const response = await axios.post("/auth/refresh/token", {
      refreshToken: auth.refreshToken || localUser.refreshToken,
      username: auth.username || localUser.username,
    });

    dispatch(login(response.data));
    return response.data.authenticationToken;
  };

  return refresh;
};

export default useRefreshToken;
