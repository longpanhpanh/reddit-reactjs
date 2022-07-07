import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SubredditSidebar from "../../components/SubredditSidebar/SubredditSidebar";
import LinearProgress from "../../components/LinearProgress/LinearProgress";
import { ToastContainer } from "react-toastify";
import ListPost from "../../components/ListPost/ListPost";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [votes, setVotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/posts`);
        if (auth?.username) {
          const voteResponse = await axiosPrivate.get(
            `/votes/by-user/${auth?.username}`
          );
          console.log(voteResponse.data);
          setVotes(voteResponse.data);
        }
        setPosts(response.data);
        setIsLoading(false);
        console.log(votes);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    fetchPost();
  }, [auth.username]);

  return (
    <div className="home">
      <Header />
      {isLoading && <LinearProgress />}
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="reddit-body">
        <div className="container">
          <div className="row justify-content-center">
            <hr />
            <div className="col-md-7">
              {/* Display Post */}
              <ListPost posts={posts} votes={votes} />
            </div>
            <div className="col-md-3">
              <Sidebar />
              <SubredditSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
