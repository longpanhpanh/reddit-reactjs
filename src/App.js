import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login.jsx";
import Home from "./pages/Home/Home.jsx";
import CreateSubreddit from "./pages/CreateSubreddit/CreateSubreddit";
import ListSubreddits from "./pages/ListSubreddits/ListSubreddits";
import CreatePost from "./pages/CreatePost/CreatePost";
import ViewPost from "./pages/ViewPost/ViewPost";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route path="/subreddits" element={<ListSubreddits />} />
        <Route path="/login" element={<Login />} />;
        <Route path="/registration" element={<Signup />} />
        {/* Protected routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/create-subreddit" element={<CreateSubreddit />} />
            <Route path="/subreddits" element={<ListSubreddits />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/view-post/:postId" element={<ViewPost />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
