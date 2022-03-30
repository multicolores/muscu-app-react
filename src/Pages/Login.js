import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

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
      maxAge: 7200,
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
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Link to="/register">
            <Button variant="outlined">Register</Button>
          </Link>
          <Button variant="contained" onClick={RegisterPostRequest}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
