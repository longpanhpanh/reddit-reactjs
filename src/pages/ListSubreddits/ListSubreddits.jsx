import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "../../api/axios";
import "./ListSubreddit.scss";
import Subreddit from "../../components/Subreddit/Subreddit";
import LinearDeterminate from "../../components/LinearProgress/LinearProgress";

const ListSubreddits = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get("/subreddit");
        setSubreddits(response.data);
        console.log(response);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubreddits();
  }, []);

  return (
    <>
      {isLoading && <LinearDeterminate />}
      <div className="container">
        <div className="row">
          <hr />
          <div className="col-md-9">
            <h2>List of Subreddits</h2>
            <ul>
              {subreddits.map((subreddit) => (
                <Subreddit
                  id={subreddit.id}
                  key={subreddit.id}
                  name={subreddit.name}
                />
              ))}
            </ul>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSubreddits;
