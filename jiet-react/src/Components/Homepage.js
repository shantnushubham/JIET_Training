import React, { useEffect, useState } from "react";
import "../css/homepage.css";
import Axios from "axios";
import TaskCard from "./TaskCard";

const Homepage = (props) => {
  const { user } = props;
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      console.log(user._id);
      const fetchTasks = async () => {
        await Axios.get(`http://localhost:7000/task/user/${user._id}`)
          .then(({ data: foundTasks }) => {
            console.info("All tasks were found.");
            console.info(foundTasks);
            setTasks(foundTasks);
          })
          .catch((error) => {
            console.error("Some error occurred.", error);
          });
      };
      fetchTasks();
    }
  }, [user]);
  // Value 1: Don't pass 2nd argument -> Calls useEffect on every re-render
  // Value 2: Empty Array -> Calls useEffect only on initial render
  // Value 3: Array with some variables -> Calls useEffect on initial render and whenever a
  // variable in the array changes.

  const renderCards = tasks.map((task, index) => {
    return <TaskCard task={task} key={index} />;
  });

  return (
    <div className={"section"}>
      <h1>Welcome, {user.firstName}!</h1>
      {/* Cards */}
      <div className={"ui cards"}>{renderCards}</div>
    </div>
  );
};

export default Homepage;
