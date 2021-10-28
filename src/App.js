import "./App.css";
import { Button } from "@mui/material";
import React from "react";
import useTimer from "easytimer-react-hook";
import { format } from "date-fns";
import { GET_TASKS } from "./api/queries";
import { START_TIMERECORD, STOP_TIMERECORD } from "./api/mutations";
import { useQuery, useMutation } from "@apollo/client";

function App() {
  const [timer] = useTimer();

  const [isTracking, setIsTracking] = React.useState(false);
  const [startTracking] = useMutation(START_TIMERECORD);
  const [stopTracking] = useMutation(STOP_TIMERECORD);

  const [currentTask, setCurrentTask] = React.useState(null);

  const { data: allTasks, refetch } = useQuery(GET_TASKS, {
    variables: { input: { where: { status: { EQ: "active" } } } },
  });

  React.useEffect(() => {
    if (currentTask) {
      const newCurrentTaskData = allTasks.tasks.filter(
        (item) => currentTask.id === item.id
      );
      setCurrentTask(newCurrentTaskData[0]);
    }
    console.log(allTasks);
  }, [allTasks, currentTask]);

  const handleStartTaskTracking = async () => {
    console.log(currentTask);
    try {
      setIsTracking(true);
      await startTracking({
        variables: { input: { taskid: currentTask.id } },
      });
      timer.start({});
    } catch (e) {
      setIsTracking(false);
      alert(e.message);
    }
  };

  const handleStopTaskTracking = async () => {
    try {
      setIsTracking(false);
      await stopTracking({
        variables: { input: { taskid: currentTask.id } },
      });
      timer.reset();
      timer.stop();
    } catch (e) {
      setIsTracking(true);
      alert(e.message);
    }
    await refetch();
  };

  function handleClickTask(data) {
    setCurrentTask(data);
    timer.reset();
    timer.stop();
  }

  return (
    <>
      <header className="header">
        <h2 className="heading">TimeTracker</h2>
      </header>
      <main className="content">
        <div className="list-container">
          <ul className="task-list">
            {allTasks &&
              allTasks.tasks.map((item) => {
                return (
                  <li
                    key={item.id}
                    data={item}
                    className="task-item"
                    onClick={() => handleClickTask(item)}>
                    {item.name}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="task-container">
          <div className="task">
            <h3 className="task-heading">
              {currentTask ? currentTask.name : "Choose a task"}
            </h3>
            <p className="task-timer">
              {timer.getTotalTimeValues()["hours"].toString()}
              <span className="task-span">h.</span>
              {timer.getTotalTimeValues()["minutes"].toString()}
              <span className="task-span">m.</span>
              {timer.getTotalTimeValues()["seconds"].toString()}
              <span className="task-span">s.</span>
            </p>
            <div className="task-button-container">
              <Button
                variant="contained"
                color="success"
                onClick={handleStartTaskTracking}
                disabled={!currentTask || isTracking}
                sx={{ minWidth: 100, marginRight: "25px" }}>
                Start
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleStopTaskTracking}
                disabled={!currentTask || !isTracking}
                sx={{ minWidth: 100 }}>
                Stop
              </Button>
            </div>
          </div>
          <ul className="record-list">
            {currentTask &&
              [...currentTask.timerecords].reverse().map((timeRecord) => {
                return (
                  <li className="record" key={timeRecord.id}>
                    <h3 className="task-heading">
                      {timeRecord.name || timeRecord.notes || ""}
                    </h3>
                    <p className="task-start-date">
                      <span className="task-span">Start Date:</span>
                      {format(new Date(timeRecord.startdate), "dd.MM.yyyy")}
                    </p>
                    <p className="task-start-time">
                      <span className="task-span">Start time:</span>
                      {format(new Date(timeRecord.startdate), "hh:mm")}
                    </p>
                    <p className="task-stop-time">
                      <span className="task-span">Stop time:</span>
                      {format(new Date(timeRecord.enddate), "hh:mm")}
                    </p>
                    <p className="task-time">
                      <span className="task-span">Time in total:</span>
                      {timeRecord.timespent}
                    </p>
                    <p className="task-tracked-by">
                      <span className="task-span">Tracked by:</span>
                      {timeRecord.contact.fullname}
                    </p>
                  </li>
                );
              })}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
