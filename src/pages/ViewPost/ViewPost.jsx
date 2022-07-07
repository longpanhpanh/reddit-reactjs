import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import SubredditSidebar from "../../components/SubredditSidebar/SubredditSidebar";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast, ToastContainer } from "react-toastify";

import "./ViewPost.scss";
const ViewPost = () => {
  const axiosPrivate = useAxiosPrivate();
  const [post, setPost] = useState({});
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  let { postId } = useParams();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await axiosPrivate.get(`/posts/${postId}`);
        const commentsData = await axiosPrivate.get(
          `/comments/by-post/${postId}`
        );
        setComments(commentsData.data);
        console.log(commentsData);
        setPost(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPostAndComments();
  }, [postId, axiosPrivate]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await toast.promise(
        axiosPrivate.post("/comments", {
          postId,
          text,
          username: post.username,
        }),
        {
          pending: "Commenting...",
          success: "Done !",
          error: "Failed. Please try again",
        }
      );
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
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
        <div className="row">
          <hr />
          <div className="col-md-9">
            <div className="row post">
              <div className="post-container">
                <span>
                  <span className="sureddit-text">
                    <Link to="/" className="post-url">
                      {post.subredditName}
                    </Link>
                    <span>
                      . Posted by
                      <Link to="/" className="username">
                        {post.userName}
                      </Link>
                    </span>
                  </span>
                </span>
                <hr />
                <Link to="/" className="post-title">
                  {post.postName}
                </Link>
                <div>
                  <p className="post-text">{post.description}</p>
                </div>

                {post.postImg && (
                  <div className="post-image-wrapper">
                    <img src={post.postImg} alt="" />
                  </div>
                )}

                <div className="post-comment mt-3">
                  <form onSubmit={handleSubmitComment}>
                    <div className="form-group">
                      <textarea
                        name="comment"
                        aria-multiline
                        className="form-control"
                        placeholder="Your Thoughts?"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                      ></textarea>
                    </div>
                    <button type="submit" className="login float-right">
                      Comment
                    </button>
                    <div>
                      {comments.map((comment) => (
                        <Comment
                          key={comment.id}
                          username={comment.userName}
                          duration={comment.createdDate}
                          text={comment.text}
                        />
                      ))}
                      <hr />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <Sidebar />
            <SubredditSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPost;
