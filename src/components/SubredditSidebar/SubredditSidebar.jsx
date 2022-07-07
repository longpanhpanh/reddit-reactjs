import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

import "./SubredditSidebar.scss";

const SubredditSidebar = () => {
  let isMounted = true;
  const controller = new AbortController();
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    const fetchSubreddit = async () => {
      const response = await axios.get("/subreddit", {
        signal: controller.signal,
      });

      isMounted && setSubreddits(response.data);
    };

    fetchSubreddit();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (subreddits.length > 5) {
    setSubreddits((prev) => prev.slice(0, 5));
  }

  return (
    <div className="sidebar-view-subreddit">
      <div style={{ color: "black", fontWeight: "bold" }}>Browse Subreddit</div>
      <hr />
      <ul className="d-flex flex-column ml-5">
        {subreddits.map((subreddit) => (
          <li key={subreddit.id} className="subreddit-text">
            <Link to={`/view-subreddit/${subreddit.id}`}>{subreddit.name}</Link>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: "center" }}>
        <Link style={{ fontWeight: "bold" }} to="/subreddits">
          View All
        </Link>
      </div>
    </div>
  );
};

export default SubredditSidebar;
