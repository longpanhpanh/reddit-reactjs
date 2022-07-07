import { toast } from "react-toastify";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import PostTitle from "../PostTitle/PostTitle";

import "./ListPost.scss";

const ListPost = ({ posts, votes }) => {
  const axiosPrivate = useAxiosPrivate();

  const handleVote = async (postId, voteType) => {
    try {
      const response = await toast.promise(
        axiosPrivate.post("/votes", {
          voteType,
          postId,
        }),
        {
          pending: "Voting...",
          success: "Done.",
          error: "You have already voted for this post.",
        }
      );
      if (response.data.message) {
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      {posts?.map((post) => (
        <PostTitle
          key={post.id}
          id={post.id}
          postname={post.postname}
          subredditName={post.subredditName}
          username={post.userName}
          description={post.description}
          duration={post.duration}
          commentCount={post.commentCount}
          voteCount={post.voteCount}
          vote={votes?.find((vote) => vote.postId === post.id)}
          postImg={post.postImg}
          onVote={handleVote}
        />
      ))}
    </div>
  );
};

export default ListPost;
