import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";
import Header from "../../components/Header/Header";
import LinearProgress from "../../components/LinearProgress/LinearProgress";
import { toast, ToastContainer } from "react-toastify";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "./CreatePost.scss";

const CreatePost = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState("");

  const [inputValues, setInputValues] = useState({
    postName: "",
    url: "",
    subredditName: "",
    description: "",
  });
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // Load subreddit
  useEffect(() => {
    const fetchSubreddits = async () => {
      try {
        const response = await axios.get("/subreddit");
        setSubreddits(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSubreddits();
  }, []);

  // Handle submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!file) {
      setImgUrl("");
      await createPostHandler(imgUrl);
    } else {
      // File upload start
      const imageRef = ref(storage, `post-images/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // file uploading progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          // file upload failed
          toast.error(error.message);
        },
        () => {
          // file upload complete and get download url
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              createPostHandler(url);
            })
            .catch((err) => console.log(err));
        }
      );
      // File upload end
    }
  };

  // Create post function with firebase img url
  const createPostHandler = async (imgUrl) => {
    try {
      console.log(imgUrl);
      await toast.promise(
        axiosPrivate.post("/posts", {
          subredditName: inputValues.subredditName,
          postName: inputValues.postName,
          url: inputValues.url,
          description: inputValues.description,
          postImg: imgUrl,
        }),
        {
          pending: "Creating Post...",
          success: "Post Created.",
          error: "Something went wrong",
        }
      );

      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
      console.log(err.message);
    } finally {
      setIsLoading(false);
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
      {isLoading && <LinearProgress />}
      <div className="container">
        <div className="row">
          <hr />
          <div className="create-post-container col-md-7">
            <form className="post-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <h1 className="create-post-heading">Create Post</h1>
                <hr />
                <input
                  type="text"
                  placeholder="Title"
                  className="form-control"
                  style={{ marginTop: "5px" }}
                  name="postName"
                  value={inputValues.postName}
                  onChange={(e) =>
                    setInputValues((prev) => ({
                      ...prev,
                      postName: e.target.value,
                    }))
                  }
                />
                <input
                  type="text"
                  placeholder="URL"
                  className="form-control"
                  style={{ marginTop: "5px" }}
                  name="URL"
                  value={inputValues.url}
                  onChange={(e) =>
                    setInputValues((prev) => ({
                      ...prev,
                      url: e.target.value,
                    }))
                  }
                />

                <select
                  name="subredditName"
                  className="form-control"
                  style={{ marginTop: "5px" }}
                  onChange={(e) =>
                    setInputValues((prev) => ({
                      ...prev,
                      subredditName: e.target.value,
                    }))
                  }
                  value={inputValues.subredditName}
                >
                  <option value="" defaultValue={1} disabled>
                    Select Subreddit
                  </option>
                  {subreddits.map((subreddit) => (
                    <option key={subreddit.id}>{subreddit.name}</option>
                  ))}
                </select>

                <label htmlFor="file-uploading" className="file-btn">
                  <input
                    type="file"
                    id="file-uploading"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <span>Choose Image</span>
                </label>
                <div className="post-image-wrapper">
                  <textarea
                    placeholder="Discussing..."
                    aria-multiline
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      marginTop: "5px",
                    }}
                    value={inputValues.description}
                    onChange={(e) =>
                      setInputValues((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  ></textarea>
                  {file && <img src={URL.createObjectURL(file)} alt="" />}
                </div>

                <span>
                  <div className="float-right" style={{ marginTop: "5px" }}>
                    <button className="btnDiscard">Discard</button>
                    <button className="btnCreatePost" type="submit">
                      Post
                    </button>
                  </div>
                </span>
              </div>
            </form>
          </div>

          <div className="col-md-3"></div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
