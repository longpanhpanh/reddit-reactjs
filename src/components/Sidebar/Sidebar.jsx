import { Link } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img
        src="https://www.redditstatic.com/desktop2x/img/id-cards/home-banner@2x.png"
        alt=""
      />
      <div style={{ textAlign: "center", fontSize: "1em" }}>
        Welcome to Spring Reddit Clone home page. Come here to check in with
        your favorite subreddits.{" "}
      </div>

      <div style={{ textAlign: "center" }} className="button-wrapper">
        <Link to="/create-post">
          <button className="btnCreatePost">Create Post</button>
        </Link>
      </div>

      <div style={{ textAlign: "center" }} className="button-wrapper">
        <Link to="/create-subreddit">
          <button className="btnCreateSubreddit">Create Subreddit</button>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
