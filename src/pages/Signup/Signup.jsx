import "./Signup.scss";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { toast, ToastContainer } from "react-toastify";

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage:
        "Username must include 3-16 characters and shouldn't include any special characters!",
      required: true,
      pattern: "^[A-Za-z0-9]{3,16}$",
    },

    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "Please provide a valid email",
      required: true,
    },

    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      errorMessage:
        "Password should be 8-20 characters length and must have at least 1 letter, 1 number and 1 special character!",
      required: true,
      pattern: `^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}`,
    },

    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Password Confirmation",
      label: "Password Confirmation",
      errorMessage: "Passwords don't match !",
      required: true,
      pattern: values.password,
    },
  ];

  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      const user = await toast.promise(
        axios.post("http://localhost:8080/api/auth/signup", {
          username: values.username,
          email: values.email,
          password: values.password,
        }),
        {
          pending: "Waiting for creating your account",
          success:
            "Successfully Registered, please check your email for account verification!",
          error: "Something went wrong",
        }
      );
      if (user.data.message) {
        toast.error(user.data.message);
      }
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-section">
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
              <h4>Register</h4>
            </div>
            <div className="card-body">
              <form onSubmit={signUpHandler}>
                {inputs.map((input) => (
                  <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                  />
                ))}

                <span className="col-md-6 offset-md-4">
                  <button type="submit" className="sign-up">
                    Sign Up
                  </button>
                  <span style={{ paddingLeft: "15px" }}>
                    Existing user? <Link to="/login">Log In</Link>
                  </span>
                </span>
              </form>
            </div>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default Signup;
