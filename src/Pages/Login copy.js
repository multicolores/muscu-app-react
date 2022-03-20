import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  //   const [data, setData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userdata, setuserdata] = useState(null);

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

  //   var jsonData = {
  //     name: "Legs",
  //     exercise: ["Squat", "svldt", "Split Squat"],
  //     description: "La scéance des jambes",
  //   };

  //   function testPostRequest() {
  //     const requestOptions = {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(jsonData),
  //     };
  //     fetch("https://api-nodejs-todo.herokuapp.com/workout", requestOptions)
  //       .then(async (response) => {
  //         const isJson = response.headers
  //           .get("content-type")
  //           ?.includes("application/json");
  //         const data = isJson && (await response.json());

  //         if (!response.ok) {
  //           const error = (data && data.message) || response.status;
  //           return Promise.reject(error);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("There was an error!", error);
  //       });
  //   }

  //   const submit = () => {
  //     console.log("yes");
  //   };

  function RegisterPostRequest() {
    //* attention a bien avoir le bon nombre de lettre toussa
    // var jsonRegisterInfo = {
    //   email: email,
    //   password: password,
    // };
    var jsonRegisterInfo = {
      email: "login@gmail.com",
      password: "1234567",
    };
    console.log(jsonRegisterInfo);

    //! nouveaux truc

    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(jsonRegisterInfo),
    // };
    // const response = await fetch(
    //   "https://api-nodejs-todo.herokuapp.com/login",
    //   requestOptions
    // );
    // const data = await response.json();
    // console.log(data);

    //todo go utiliser axios ecoute car la j'arrive a avoir les info du header

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonRegisterInfo),
    };
    fetch("https://api-nodejs-todo.herokuapp.com/login", requestOptions)
      .then((response) => console.log(response.headers.get("Auth-Token")))
      .then((data) => console.log(data));

    //! ancien truc ouais
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(jsonRegisterInfo),
    // };
    // fetch("https://api-nodejs-todo.herokuapp.com/login", requestOptions)
    //   .then(async (response) => {
    //     const isJson = response.headers
    //       .get("content-type")
    //       ?.includes("application/json");
    //     const data = isJson && (await response.json());
    //     console.log(response.headers.get("Auth-Token"));
    //     if (!response.ok) {
    //       const error = (data && data.message) || response.status;
    //       return Promise.reject(error);
    //     }
    //     if (response.ok) {
    //       console.log(data);

    //       navigate("/mainpage");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("There was an error!", error);
    //   });
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
