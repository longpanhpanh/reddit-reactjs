import { useState, useEffect } from "react";
import PostTitle from "../../components/PostTitle/PostTitle";
import Comment from "../../components/Comment/Comment";
import LinearProgress from "../../components/LinearProgress/LinearProgress";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Header from "../../components/Header/Header";
import { ToastContainer } from "react-toastify";
import ListPost from "../../components/ListPost/ListPost";

const UserProfile = () => {
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchUserPostsAndComments = async () => {
      try {
        const postsData = await axiosPrivate.get(
          `/posts/by-user/${auth.username}`,
          {
            signal: controller.signal,
          }
        );
        const voteResponse = await axiosPrivate.get(
          `/votes/by-user/${auth.username}`
        );
        setVotes(voteResponse.data);

        const commentsData = await axiosPrivate.get(
          `/comments/by-user/${auth.username}`,
          {
            signal: controller.signal,
          }
        );
        setPosts(postsData.data);
        setComments(commentsData.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPostsAndComments();

    return () => {
      controller.abort();
    };
  }, [axiosPrivate, auth.username]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Header />
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
      <div className="container">
        <div>
          Welcome <b>{auth.username}</b>.<br /> You have posted{" "}
          <b>{posts.length}</b> time(s) and commented <b>{comments.length}</b>{" "}
          time(s). You can check your post and comment history below.
        </div>
        <hr />
        <div>Your Post:</div>
        <ListPost posts={posts} votes={votes} />
        <hr />
        <div>Your Comments:</div>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            username={comment.userName}
            duration={comment.createdDate}
            text={comment.text}
          />
        ))}
      </div>
    </>
  );
};

export default UserProfile;
