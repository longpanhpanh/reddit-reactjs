import { useSelector } from "react-redux";

const useAuth = () => {
  return (useSelector((state) => state.user));
};

export default useAuth;
