import React from "react";
import { useState, useEffect } from "react";
// import { TextField } from "@mui/material";
// import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
// import { Link } from "react-router-dom";
import axios from "axios";

import { useCookies } from "react-cookie";

// material ui imports
// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";

function Workout(props: any) {
  const [cookies, setCookie] = useCookies(["user"]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const workout_id = props.workout_id;

  useEffect(() => {
    // fetch every workouts id present in user
    axios
      .get("https://api-nodejs-todo.herokuapp.com/workout/" + workout_id, {
        headers: {
          "auth-token": cookies.user,
        },
      })
      .then((res) => {
        //   console.log(res.data);
        setData(res.data);
        console.log(res.data);
        setError(null);
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
  let i = 0;
  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>}
      {/* {data && <Application user={data.user} workout={data.user.workout} />} */}
      {data && (
        <>
          <p>{data.name}</p>
          {data.exercise.map((name: string) => (
            <p key={name}>{name}</p>
          ))}

          {data.training.map((id: string) => (
            <>
              <p key={id}>{id}</p>
            </>
          ))}
          {/* <DataTableRow data={data} /> */}
        </>
        // <span>Les Data ouais</span>
      )}
    </div>
  );
}

export default Workout;

const DataTableRow = ({ data }) => <p>{data.name}</p>;
