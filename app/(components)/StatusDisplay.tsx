import React from "react";

interface Iprops {
  status: string;
}

const getColor = (status: String) => {
  let color = "bg-slate-700";
  switch (status.toLowerCase()) {
    case "complete":
      color = "bg-green-200";
      return color;
    case "started":
      color = "bg-yellow-200";
      return color;
    case "not started":
      color = "bg-red-200";
      return color;
  }
  return color;
};

const StatusDisplay = (props: Iprops) => {
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        props.status
      )}`}
    >
      {props.status}
    </span>
  );
};

export default StatusDisplay;
