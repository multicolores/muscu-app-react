import { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/materialUI/Notification";

import "../styles/login_register.scss";

function Register() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  let navigate = useNavigate();

  //   useEffect(() => {
  //     // data fetching here
  //     fetch(`https://api-nodejs-todo.herokuapp.com/workout`)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(
  //             `This is an HTTP error: The status is ${response.status}`
  //           );
  //         }
  //         return response.json();
  //       })
  //       .then((actualData) => {
  //         setData(actualData);
  //         setError(null);
  //         console.log(actualData);
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //         setError(err.message);
  //         setData(null);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   }, []);

  var jsonData = {
    name: "Legs",
    exercise: ["Squat", "svldt", "Split Squat"],
    description: "La scéance des jambes",
  };

  function testPostRequest() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonData),
    };
    fetch("https://api-nodejs-todo.herokuapp.com/workout", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());

        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  //   var jsonRegisterInfo = {
  //     name: "test45encore",
  //     email: "okfeztest@gmail.com",
  //     password: "123456",
  //   };
  // function RegisterPostRequest() {
  //   //* attention a bien avoir le bon nombre de lettre toussa
  //   var jsonRegisterInfo = {
  //     name: name,
  //     email: email,
  //     password: password,
  //   };
  //   console.log(jsonRegisterInfo);
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(jsonRegisterInfo),
  //   };
  //   fetch("https://api-nodejs-todo.herokuapp.com/register", requestOptions)
  //     .then(async (response) => {
  //       const isJson = response.headers
  //         .get("content-type")
  //         ?.includes("application/json");
  //       const data = isJson && (await response.json());
  //       console.log(response);
  //       if (!response.ok) {
  //         const error = (data && data.message) || response.status;
  //         return Promise.reject(error);
  //       }
  //       if (response.ok) {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //       if (error.response) {
  //         console.log(error.response.data);
  //         console.log(error.response.status);
  //         alert("Error " + error.response.status + " : " + error.response.data);
  //         // console.log(error.response.headers);
  //       }
  //       // alert(error);
  //     });
  // }

  function RegisterPostRequest() {
    //* attention a bien avoir le bon nombre de lettre toussa
    var jsonRegisterInfo = {
      name: name,
      email: email,
      password: password,
    };
    console.log(jsonRegisterInfo);

    axios
      .post(`https://api-nodejs-todo.herokuapp.com/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          // alert("Error " + error.response.status + " : " + error.response.data);
          setNotify({
            isOpen: true,
            message: "Error" + " : " + error.response.data,
            type: "error",
          });
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
          <h1>Registration</h1>
          <TextField
            label="Name"
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
            <Link to="/login">
              <Button variant="outlined" className="registerButton">
                Login
              </Button>
            </Link>

            <Button
              variant="contained"
              onClick={RegisterPostRequest}
              className="loginButton"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default Register;
