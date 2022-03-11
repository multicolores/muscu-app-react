import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
// import { Link } from "react-router-dom";

import { useCookies } from "react-cookie";

function MainPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cookies, setCookie] = useCookies(["user"]);

  useEffect(() => {
    // data fetching here
    fetch(`https://api-nodejs-todo.herokuapp.com/workout`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
        console.log(actualData);
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function handleTextFieldChange(e) {
    console.log(e.target.value);
  }

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

  function gettokentest() {
    var req = new XMLHttpRequest();
    req.open("GET", document.location, false);
    req.send(null);
    var headers = req.getAllResponseHeaders().toLowerCase();
    alert(headers);
  }

  function setAcookie() {
    setCookie("user", "gowtham", {
      path: "/",
      maxAge: 3600,
    });
  }
  return (
    <div>
      <header>
        <h1>test ftech api</h1>
        {loading && <div>A moment please...</div>}
        {error && (
          <div>{`There is a problem fetching the post data - ${error}`}</div>
        )}
        <ul>
          {data &&
            data.map(({ _id, name, description, exercise }) => (
              <li key={_id}>
                <h3>{name}</h3>
                <span>{_id}</span>
                <p>{description}</p>
                <p>{exercise}</p>
              </li>
            ))}
        </ul>
        {cookies.user && <p>{cookies.user}</p>}
      </header>

      <Button variant="contained" onClick={gettokentest}>
        Get Token
      </Button>
      <Button variant="contained" onClick={setAcookie}>
        Set cookie
      </Button>
    </div>
  );
}

export default MainPage;
