import React from "react";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const datas = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Graphique = (props: any) => {
  let data = [];
  function createdataObject(row: any) {
    let repNumber = 0;
    for (let i = 2; i < row.length; i++) {
      repNumber += row[i];
    }
    if (repNumber != 0) {
      let dataObjectToAdd = { weight: row[0], reps: repNumber };
      data.push(dataObjectToAdd);
      //   data = { ...data, ...dataObjectToAdd };
      //   Object.assign(data, dataObjectToAdd);
      console.log(data);
      // data.sort();
      // console.log(data);
    }
  }
  console.log(props.data);
  props.data.map((row: any) => createdataObject(row));
  data.reverse();
  return (
    <>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis /> */}
        <XAxis dataKey="weight" />
        {/* <XAxis dataKey="name" /> */}
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="reps" stroke="#000000" />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </>
  );
};

export default Graphique;
