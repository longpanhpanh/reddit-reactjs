import "./Login.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "../../api/axios";
import FormInput from "../../components/FormInput/FormInput";
import { login } from "../../redux/userSlice";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: true,
      errorMessage: "Please provide an username.",
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
      errorMessage: "Password must not be empty.",
    },
  ];

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await toast.promise(
        axios.post("/auth/login", {
          username: values.username,
          password: values.password,
        }),
        {
          pending: "Logging in...",
          success: `Welcome back human!`,
          error:
            "Cannot log you in please check your credentials and try again !",
        }
      );
      dispatch(login(response.data));
      navigate(from, { replace: true });
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: response.data.username,
          refreshToken: response.data.refreshToken,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-section">
      <ToastContainer
        position="top-center"
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
      <div className="row justify-content-center">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header" style={{ textAlign: "center" }}>
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={loginHandler}>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}

                <span className="col-md-6 offset-md-4">
                  <button type="submit" className="login">
                    Login
                  </button>
                </span>
                <p style={{ paddingLeft: "26px", marginTop: "5px" }}>
                  New to Community? Create an account now{" "}
                  <Link to="/registration">Register new account</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Login;
