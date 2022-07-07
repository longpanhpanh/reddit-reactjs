import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRefreshToken from "../../hooks/useRefreshToken";
import LinearProgress from "../LinearProgress/LinearProgress";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const auth = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.authenticationToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <LinearProgress /> : <Outlet />}</>;
};

export default PersistLogin;
