import "./PostTitle.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  Forum,
  ArrowDropDownRounded,
  ArrowDropUpRounded,
} from "@mui/icons-material";

const PostTitle = (props) => {
  const {
    id,
    subredditName,
    username,
    description,
    duration,
    commentCount,
    voteCount,
    postname,
    postImg,
    vote,
    onVote,
  } = props;

  const navigate = useNavigate();

  return (
    <div className="row post">
      {/* Section for display vote */}
      <div className="col-md-1">
        <div className="d-flex flex-column votebox align-items-center">
          <div className="p-2">
            <button className="vote-btn" onClick={() => onVote(id, "UPVOTE")}>
              <ArrowDropUpRounded
                className={`up-arrow ${
                  vote?.voteType === "UPVOTE" ? `voted` : ``
                }`}
              />
            </button>
          </div>

          <div className="p-2">{voteCount}</div>

          <div className="p-2">
            <button className="vote-btn" onClick={() => onVote(id, "DOWNVOTE")}>
              <ArrowDropDownRounded
                className={`down-arrow ${
                  vote?.voteType === "DOWNVOTE" ? `voted` : ``
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-11">
        <span className="subreddit-info">
          <Link to="/" className="posturl">
            <span className="subreddit-text">{subredditName}</span>
          </Link>

          <span>
            <Link className="username" to="/">
              <span>
                . Posted by <b>{username}</b>
              </span>
            </Link>
          </span>

          <span>{duration}</span>
        </span>
        <hr />

        <div className="post-title">
          <Link to="/" className="postname">
            {postname}
          </Link>
        </div>

        <div>
          <p className="post-text">{description}</p>
        </div>

        <hr />

        {postImg && (
          <div className="post-image-wrapper">
            <img src={postImg} alt="" />
          </div>
        )}

        <div>
          <Link to="/" className="comment">
            <Forum />
            Comments {commentCount}
          </Link>

          <button
            className="login"
            onClick={() => navigate(`/view-post/${id}`)}
          >
            Read Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostTitle;
