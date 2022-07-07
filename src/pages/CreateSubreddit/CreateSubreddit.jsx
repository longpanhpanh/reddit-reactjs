import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import LinearProgress from "../../components/LinearProgress/LinearProgress";
import Header from "../../components/Header/Header";
import { toast, ToastContainer } from "react-toastify";

import "./CreateSubreddit.scss";

const CreateSubreddit = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await toast.promise(
        axiosPrivate.post(
          "/subreddit",
          { name: title, description: desc },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        ),
        {
          pending: "Creating Subreddit...",
          success: "Subreddit Created.",
          error: "Something went wrong",
        }
      );
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="row justify-content-center">
          <div className="create-subreddit-container col-md-7">
            <form action="" className="post-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <h1 className="create-subreddit-heading">Create Subreddit</h1>
                <hr />
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  style={{ marginTop: "5px" }}
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  name="description"
                  cols="30"
                  rows="10"
                  style={{ width: "100%", marginTop: "5px" }}
                  placeholder="Description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                ></textarea>
                <div>
                  <div className="float-right">
                    <button className="btnDiscard">Discard</button>
                    <button className="btnCreateSubreddit" type="submit">
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="col-md-3">
            <div className="note-sidebar">
              <h5 className="guidelines">Posting to Spring Reddit</h5>
              <hr />
              <ul>
                <li>Remember the human</li>
                <hr />
                <li>Behave like you would in real life</li>
                <hr />
                <li>Don't spam</li>
                <hr />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSubreddit;
