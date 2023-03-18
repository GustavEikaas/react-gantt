import React from "react";
import ReactDOM from "react-dom/client";
import Gantt from "../src/gantt";
import { GanttData } from "../src/gantt/types";
import { addDays, addMonths, subDays } from "date-fns";

const make = (amount: number): GanttData[] =>
  new Array(amount).fill(0).map((s, i) => ({
    label: `test${i}`,
    duration: Math.random() * 50,
    startDate: addDays(new Date(), Math.random() * 20),
  }));

const ganttData = make(250);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Gantt
      projectEnd={addMonths(new Date(), 10)}
      projectStart={new Date()}
      data={[
        {
          duration: 50,
          startDate: subDays(new Date(), 20),
          label: "breaking timeline",
        },
        ...ganttData,
        {
          duration: 50,
          startDate: addMonths(new Date(), 9),
          label: "breaking timeline",
        },
      ]}
    />
  </React.StrictMode>
);
