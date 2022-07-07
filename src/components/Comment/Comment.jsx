import "./Comment.scss";
import { Link } from "react-router-dom";

const Comment = ({ username, text, duration }) => {
    
  return (
    <div className="comment">
      <div className="username">
        <Link to={`/user/${username}`}>{username}</Link>
      </div>

      <div>
        <p>{duration}</p>
      </div>
      <b>{text}</b>
    </div>
  );
};

export default Comment;
