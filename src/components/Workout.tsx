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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import Fab from "@material-ui/core/Fab";
// import AddIcon from "@material-ui/icons/Add";

import "./WorkoutStyle.scss";
import AddTraining from "./AddTraining";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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

  function CreatExerciseTable() {
    // https://flaviocopes.com/react-how-to-loop/

    //TODO pour tousa faire un autre component
    let items = [];
    for (let i = 0; i < data.exercise.length; i++) {
      console.log(data.exercise[i].name);
      items.push(
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow key={i}>
                <TableCell>{data.exercise[i].name}</TableCell>
                <TableCell>{data.exercise[i].recuperation}</TableCell>
                <TableCell>{data.exercise[i].weight}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.exercise[i].repetition.map((row: any) => (
                <TableRow
                  key={Math.random()}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {exercieRep(row)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
    return items;
  }

  function CreatExercise() {
    // https://flaviocopes.com/react-how-to-loop/

    let items = [];
    for (let i = 0; i < data.exercise.length; i++) {
      console.log(data.exercise[i].name);
      items.push(
        <div className="exerciseTable">
          <div className="exoInfo">
            <span>{data.exercise[i].name}</span>
            <span>{data.exercise[i].recuperation}</span>
            <span>{data.exercise[i].weight}</span>
          </div>
          <div className="repsContainer">
            {data.exercise[i].repetition.map((row: any) => (
              <div className="repRow" key={Math.random()}>
                {exercieRep(row)}
              </div>
            ))}
          </div>
        </div>
      );
    }
    return items;
  }
  function exercieRep(repArray: []) {
    let repRow = [];
    for (let e = 0; e < repArray.length; e++) {
      repRow.push(<span>{repArray[e]}</span>);
    }
    return repRow;
  }

  // function exercieRep(repArray: []) {
  //   let repRow = [];
  //   for (let e = 0; e < repArray.length; e++) {
  //     repRow.push(<TableCell>{repArray[e]}</TableCell>);
  //   }
  //   return repRow;
  // }

  return (
    <div className="workoutContainer">
      {loading && <div>A moment please...</div>}
      {error && <div>{`There is a problem fetching user data - ${error}`}</div>}
      {/* {data && <Application user={data.user} workout={data.user.workout} />} */}
      {data && (
        <>
          <h1>{data.name}</h1>
          {/* <p>{data.description}</p> */}
          {/* {showExercises()} */}
          <div className="tableContainer">{CreatExercise()}</div>
          <AddTraining workout={data} />

          {/* {data.exercise.map((name: string) => (
            <p key={name}>{name}</p>
          ))} */}

          {/* {data.training.map((id: string) => (
            <>
              <p key={id}>{id}</p>
            </>
          ))} */}
          {/* <DataTableRow data={data} /> */}
        </>
      )}
    </div>
  );
}

export default Workout;

const DataTableRow = ({ data }) => <p>{data.name}</p>;
