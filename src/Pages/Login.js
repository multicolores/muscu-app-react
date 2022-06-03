import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import "../styles/login_register.scss";

function Login() {
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userdata, setuserdata] = useState(null);

  const [cookies, setCookie] = useCookies(["user"]);

  let navigate = useNavigate();
  // useEffect(() => {
  //   axios.get(`https://api-nodejs-todo.herokuapp.com/workout`).then((res) => {
  //     const persons = res.data;
  //     console.log(res);
  //     console.log(persons);
  //     // this.setState({ persons });
  //   });
  // }, []);

  function setACookie(token) {
    setCookie("user", token, {
      path: "/",
      maxAge: 604800,
      // maxAge: 7200,
    });
  }

  function RegisterPostRequest() {
    //* attention a bien avoir le bon nombre de lettre ect ..
    // var jsonRegisterInfo = {
    //   email: "login@gmail.com",
    //   password: "1234567",
    // };
    axios
      .post(`https://api-nodejs-todo.herokuapp.com/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data);
        setACookie(res.data);
        navigate("/mainpage");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          alert("Error " + error.response.status + " : " + error.response.data);
          // console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  }

  return (
    <div>
      <div className="contactPage_Container">
        <div className="registerContainer">
          <h1>Login</h1>
          {/* <TextField label="Name" onChange={handleTextFieldChange} /> */}
          <TextField
            label="Email"
            variant="standard"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            variant="standard"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="button_container">
            <Link to="/register">
              <Button variant="outlined" className="registerButton">
                Register
              </Button>
            </Link>
            <Button
              variant="contained"
              onClick={RegisterPostRequest}
              className="loginButton"
            >
              Sign in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
