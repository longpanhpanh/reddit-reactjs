import React from "react";
import { Link } from "react-router-dom";

const Subreddit = ({ id, name }) => {
  return (
    <li>
      <Link to={`/view-subreddit/${id}`}>
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default Subreddit;
